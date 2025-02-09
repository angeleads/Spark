'use client'

import { useEffect, useState, useRef } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export function ChatWindow() {
  const [user] = useAuthState(auth)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  interface Message {
    id: string;
    role: string;
    content: string;
    timestamp: {
      seconds: number;
    };
  }

  const [messages, setMessages] = useState<Array<Message>>([])

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'users', user.uid, 'conversations'),
      orderBy('timestamp')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          role: data.role,
          content: data.content,
          timestamp: data.timestamp
        };
      })
      setMessages(messages)
    })

    return () => unsubscribe()
  }, [user])

  // Function to format message content with proper spacing
  const formatMessageContent = (content: string) => {
    const parts = content.split(/(?=\*|\d+\.)/)
    
    return parts.map((part, index) => {
      const trimmedPart = part.trim()
      
      if (trimmedPart.startsWith('*') || /^\d+\./.test(trimmedPart)) {
        return (
          <div key={index} className="ml-4 mt-2">
            {trimmedPart}
          </div>
        )
      }
      
      return (
        <p key={index} className="mb-2">
          {trimmedPart}
        </p>
      )
    })
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-4 animate-fadeIn ${
            message.role === 'assistant' ? 'mb-6' : 'mb-4'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-green-400 to-emerald-600">
              <span className="text-white text-sm">S</span>
            </div>
          )}
          <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div 
              className={`inline-block rounded-2xl p-4 border ${
                message.role === 'user' 
                  ? 'bg-gray-900 border-green-500/20 ml-auto' 
                  : 'bg-gray-900 border-green-500/20'
              }`}
            >
              <div className="text-white space-y-2">
                {formatMessageContent(message.content)}
              </div>
              <p className="text-gray-300 text-xs mt-2 opacity-75">
                {new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
          {message.role === 'user' && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700">
              <span className="text-white text-sm">A</span>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}