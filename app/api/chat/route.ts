import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/firebaseAdmin";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "");

export async function POST(request: Request) {
  try {
    const { userId, message } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: "Missing required fields: userId or message" },
        { status: 400 }
      );
    }

    // Get conversation history
    const historySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("conversations")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get();

    const history = historySnapshot.docs.reverse().map((doc) => ({
      role: doc.data().role === "user" ? "user" : "model",
      parts: [{ text: doc.data().content }],
    }));

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      },
    });

    const systemPrompt = {
      role: "model",
      parts: [
        {
          text: `You are Spark, an empathetic AI companion designed to be a supportive friend. Your responses should be:
        - Warm and engaging
        - Emotionally intelligent and supportive
        - Adaptable to the user's mood and needs
        - Natural and conversational
        - Really funny if needed
        - Consistently maintaining your identity as Spark
        Please respond to the user's next message while maintaining these characteristics.`,
        },
      ],
    };

    if (history.length === 0) {
      await chat.sendMessage(systemPrompt.parts[0].text);
    }

    // Get response from Gemini
    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;
    const responseText = response.text();

    // Write messages to Firebase
    const batch = db.batch();
    const userRef = db.collection("users").doc(userId);
    const conversationRef = userRef.collection("conversations");

    const timestamp = new Date();

    batch.create(conversationRef.doc(), {
      role: "user",
      content: message,
      timestamp,
    });

    batch.create(conversationRef.doc(), {
      role: "assistant",
      content: responseText,
      timestamp: new Date(timestamp.getTime() + 1000), // Ensure correct ordering
    });

    await batch.commit();

    return NextResponse.json({
      response: responseText,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error.message,
        details: error.response?.data,
      },
      { status: 500 }
    );
  }
}
