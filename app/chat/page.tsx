// app/chat/page.tsx
'use client'

import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const [user] = useAuthState(auth)
  const router = useRouter()

  // Redirect if not authenticated
  if (!user) {
    router.push('/auth')
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-green-500/20 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            SPARK AI
          </h1>
          <button
            onClick={() => auth.signOut()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main chat area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto flex flex-col">
          <ChatWindow />
          <ChatInput />
        </div>
      </div>
    </div>
  )
}