// components/chat/ChatInput.tsx
'use client'

import { useState } from 'react'

export function ChatInput() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    // TODO: Implement chat functionality
    console.log('Message sent:', message)
    setMessage('')
  }

  return (
    <div className="p-4 border-t border-green-500/20">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 border border-green-500/20 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}