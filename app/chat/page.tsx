// app/chat/page.tsx
'use client'

import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import Header from '@/components/layout/Header'
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
      <Header />

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