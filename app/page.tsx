// app/page.tsx

'use client'

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Shield, Sparkles, MessageCircle, Code, Zap, ChevronDown, Github } from 'lucide-react';
import { AiIntegration } from '@/components/Home/AiIntegration';

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,255,127,0.1)_0%,transparent_50%)]" />
      <svg className="absolute w-full h-full opacity-30">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0, 255, 127, 0.2)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

const SparkLandingPage = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <ParticleBackground />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 mx-auto"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-7xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
              SPARK AI
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Experience the next generation of AI companionship. Powered by advanced 
            language models and emotional intelligence.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
          <a href="/chat">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Start Chatting
              </button>
            </a>
            <a href="https://github.com/angeleads/Spark" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-gray-900 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all border border-green-500/20 flex items-center gap-2">
              <Github className="w-5 h-5" />
              View on GitHub
              </button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-green-500" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-24"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              The Future of AI Interaction
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12" />,
                title: "Advanced Intelligence",
                description: "Powered by Google's Gemini Pro for human-like understanding and responses"
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Secure & Private",
                description: "End-to-end encryption with Firebase for complete privacy"
              },
              {
                icon: <Sparkles className="w-12 h-12" />,
                title: "Emotional Intelligence",
                description: "Contextual awareness and emotional adaptation in every conversation"
              },
              {
                icon: <MessageCircle className="w-12 h-12" />,
                title: "Natural Dialogue",
                description: "Fluid conversations with memory and context understanding"
              },
              {
                icon: <Code className="w-12 h-12" />,
                title: "Modern Stack",
                description: "Built with Next.js, Firebase, TailwindCSS and Google Gemini API"
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Real-time Updates",
                description: "Instant responses with typing indicators and live updates"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative p-8 rounded-3xl bg-gray-900/80 border border-green-500/20 hover:border-green-500/40 transition-all backdrop-blur-sm">
                  <div className="text-green-500 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <AiIntegration />

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              Ready to Meet Your AI Companion?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of users already experiencing the future of AI interaction
          </p>
          <button 
          onClick={() => window.location.href = "/chat"}
          className="px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto">
            <Sparkles className="w-6 h-6" />
            SPARK AI
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default SparkLandingPage;