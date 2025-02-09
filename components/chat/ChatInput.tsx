// components/chat/ChatInput.tsx
'use client'

import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import toast from 'react-hot-toast'

export function ChatInput() {
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user) return
  
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          message: message
        })
      })
  
      const data = await response.json()
      
      if (!response.ok) {
        console.error('API Error Response:', data)
        throw new Error(data.error?.message || 'Failed to send message')
      }
  
    } catch (error) {
      console.error('Full Error:', error)
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
      setMessage('')
    }
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
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}