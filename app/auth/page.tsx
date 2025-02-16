// app/auth/page.tsx
'use client'

import { useState } from 'react'
import { AuthForm } from '@/components/auth/AuthForm'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);


  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,255,127,0.1)_0%,transparent_90%)] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
            SPARK AI
          </h1>
        </div>
        <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  )
}