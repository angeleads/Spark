// components/chat/ChatWindow.tsx
'use client'

export function ChatWindow() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Welcome message */}
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center">
          <span className="text-white text-sm">N</span>
        </div>
        <div className="flex-1">
          <div className="bg-gray-900 rounded-lg p-4 border border-green-500/20">
            <p className="text-white">
              Welcome to Spark AI! I am here to chat, help, and learn with you. What is on your mind?
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}