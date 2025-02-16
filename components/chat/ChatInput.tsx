// components/chat/ChatInput.tsx
import { useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import toast from 'react-hot-toast'

export function ChatInput() {
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!message.trim() || !user || isLoading) return
  
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
      if (error instanceof Error) {
        toast.error(error.message || 'An unexpected error occurred')
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
      setMessage('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <div className="p-4 border-t border-green-500/20">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex space-x-4">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 border border-green-500/20 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all min-h-[44px] max-h-[200px] resize-none"
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 h-[44px]"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}