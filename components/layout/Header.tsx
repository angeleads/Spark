import React from 'react';
import { auth } from '@/lib/firebase'

const Header: React.FC = () => {

    return (
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
    );
};

export default Header;