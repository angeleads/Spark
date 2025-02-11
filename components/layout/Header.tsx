import React from "react";
import { auth } from "@/lib/firebase";
import { Sparkles } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-green-500/20 p-4">
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-2 ">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <h1
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 cursor-pointer"
          onClick={() => window.location.href = "/"}
        >

          SPARK AI
        </h1>
      </div>
      <button
        onClick={() => {
        auth.signOut().then(() => {
          window.location.href = "/";
        });
        }}
        className="text-gray-400 hover:text-red-400 transition-colors"
      >
        Sign Out
      </button>
    </div>
    </header>
  );
};

export default Header;
