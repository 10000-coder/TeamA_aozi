import React, { useState } from 'react';
import { 
  Flame, 
  Rocket, 
  BookOpen, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Wallet, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';

export default function Navbar({ currentRoute, navigate }) {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, ethBalance, connectWallet } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#050606]/85 border-b border-black/[0.08] dark:border-white/[0.08] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <span className="font-serif italic text-xl font-bold text-white">a</span>
          </div>
          <span className="font-bold text-base tracking-tight">aozi.family</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          <button
            onClick={connectWallet}
            className="b b1 px-3 py-1.5 text-xs font-bold rounded-full flex items-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{isConnected ? `${ethBalance} ETH` : 'Connect'}</span>
          </button>
        </div>
      </header>
    </>
  );
}
