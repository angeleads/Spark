// app/page.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black p-4">
      <div className="text-center space-y-6 max-w-3xl mx-auto p-4">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            SPARK AI
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 mt-4">
          Your intelligent companion for meaningful conversations, 
          powered by advanced AI technology
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Link 
            href="/auth" 
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/chat"
            className="px-6 py-3 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/10 transition-all"
          >
            Open Chat
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Smart Conversations',
              description: 'Engage in natural, context-aware dialogues'
            },
            {
              title: 'Personalized Experience',
              description: 'Adapts to your interests and preferences'
            },
            {
              title: 'Always Available',
              description: '24/7 companion ready to chat and help'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-gray-900 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}