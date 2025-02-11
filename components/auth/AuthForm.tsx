"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export function AuthForm({ isLogin, setIsLogin }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          userId: user.uid,
          email: email,
          createdAt: new Date().toISOString(),
        });
      }

      console.log("Current User:", auth.currentUser);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        isLogin ? "Welcome back!" : "Account created successfully!"
      );
      router.push("/chat");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-green-500/30 backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <label className="block text-sm font-normal text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full px-4 py-3 rounded-full bg-black/50 border border-green-500/30 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all outline-none placeholder-transparent"
            placeholder="Enter your email"
            required
          />
        </motion.div>

        {/* Password Input */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <label className="block text-sm font-normal text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full px-4 py-3 rounded-full bg-black/50 border border-green-500/30 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all outline-none placeholder-transparent"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-full hover:from-green-700 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : isLogin ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </motion.button>
      </form>

      {/* Toggle Login/Signup */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-400 hover:text-green-300 text-sm transition-colors hover:underline"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </motion.div>
  );
}
