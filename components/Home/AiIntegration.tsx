import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Heart } from "lucide-react";

export function AiIntegration() {
  return (
    <section className="relative py-32 px-4">
      <div className="absolute inset-0 bg-black" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              AI Intelligence in Action
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience how SPARK AI adapts and responds to different
            conversation scenarios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Interactive Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-green-500/20 overflow-hidden">
              <div className="p-4 border-b border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-green-500 font-semibold">
                    Live Chat Preview
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm">S</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-800 rounded-2xl p-4 inline-block">
                      <p className="text-gray-300">
                        Hello! I am SPARK, your AI companion. How can I assist
                        you today?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start justify-end pt-4 pb-4">
                  <div className="flex justify-end items-end">
                    <div className=" bg-green-500/10 rounded-2xl p-4">
                      <p className="text-gray-300">
                        I need you to help me.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm">U</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm">S</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-800 rounded-2xl p-4">
                      <p className="text-gray-300">
                        I would be happy to help! I can
                        assist with:
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-400">
                        <li>• Understanding your emotions</li>
                        <li>• Managing your time effectively</li>
                        <li>• Building positive relationships</li>
                        <li>• Setting and achieving goals</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Capabilities Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {[
              {
                title: "Natural Language Processing",
                description:
                  "Understanding context, emotions, and nuanced communication",
                icon: <Brain className="w-6 h-6" />,
                percentage: 98,
              },
              {
                title: "Emotional Intelligence",
                description:
                  "Adapting responses based on user sentiment and context",
                icon: <Heart className="w-6 h-6" />,
                percentage: 95,
              },
              {
                title: "Knowledge Processing",
                description:
                  "Fast and accurate information processing and retrieval",
                icon: <Zap className="w-6 h-6" />,
                percentage: 99,
              },
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                <div className="relative p-6 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                      {capability.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {capability.title}
                      </h3>
                      <p className="text-gray-400">{capability.description}</p>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${capability.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    />
                  </div>
                  <div className="mt-2 text-right text-green-500 font-semibold">
                    {capability.percentage}%
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
