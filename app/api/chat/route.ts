//app/api/chatimport 
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { db } from '@/lib/firebaseAdmin'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '');

export async function POST(request: Request) {
  try {
    const { userId, message } = await request.json()
    
    // Validate input
    if (!userId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId or message' },
        { status: 400 }
      )
    }

    // Get conversation history
    const historySnapshot = await db
      .collection('users')
      .doc(userId)
      .collection('conversations')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get()

    const history = historySnapshot.docs
      .reverse()
      .map(doc => ({
        role: doc.data().role === 'user' ? 'user' : 'model',
        parts: [{ text: doc.data().content }]
      }))

    // Create a chat with Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    // Add system prompt to shape Spark's personality
    const systemPrompt = {
      role: 'model',
      parts: [{
        text: `You are Spark, an empathetic AI companion designed to be a supportive friend. Your responses should be:
        - Warm and engaging
        - Emotionally intelligent and supportive
        - Adaptable to the user's mood and needs
        - Natural and conversational
        - Really funny if needed
        - Consistently maintaining your identity as Spark
        Please respond to the user's next message while maintaining these characteristics.`
      }]
    };

    if (history.length === 0) {
      await chat.sendMessage(systemPrompt.parts[0].text);
    }

    // Get response from Gemini
    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;
    const responseText = response.text();

    // Prepare batch write
    const batch = db.batch()
    const userRef = db.collection('users').doc(userId)
    const conversationRef = userRef.collection('conversations')

    const newUserMsgRef = conversationRef.doc()
    const newAssistantMsgRef = conversationRef.doc()

    batch.create(newUserMsgRef, {
      role: 'user',
      content: message,
      timestamp: new Date()
    })
    
    batch.create(newAssistantMsgRef, {
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    })

    await batch.commit()

    return NextResponse.json({ 
      response: responseText
    })
    
  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: error.message,
        details: error.response?.data
      },
      { status: 500 }
    )
  }
}