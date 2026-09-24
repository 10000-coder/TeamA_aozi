import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { Sun, Moon, Menu, X, ArrowUpRight, Wallet } from 'lucide-react';

export default function Navbar({ currentRoute, navigate }) {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, handle, connectWallet, disconnectWallet } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route, e) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    navigate(route);
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-[#050606]/80 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="/"
              onClick={(e) => handleNav('/', e)}
              className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-1.5"
            >
              <span className="serif italic text-3xl font-normal">aozi</span>
              <span className="text-sm font-semibold opacity-60">.family</span>
            </a>

            <nav className="hidden md:flex items-center gap-1 text-[15px] font-medium text-neutral-600 dark:text-neutral-300">
              <a
                href="#coins"
                onClick={(e) => handleNav('/#coins', e)}
                className="px-3 py-1.5 rounded-lg hover:text-black dark:hover:text-white transition-colors"
              >
                Coins
              </a>
              <a
                href="#porch"
                onClick={(e) => handleNav('/#porch', e)}
                className="px-3 py-1.5 rounded-lg hover:text-black dark:hover:text-white transition-colors"
              >
                Porch talk
              </a>
              <a
                href="/launch"
                onClick={(e) => handleNav('/launch', e)}
                className="px-3 py-1.5 rounded-lg hover:text-black dark:hover:text-white transition-colors"
              >
                How to launch
              </a>
              <a
                href="/docs"
                onClick={(e) => handleNav('/docs', e)}
                className="px-3 py-1.5 rounded-lg hover:text-black dark:hover:text-white transition-colors"
              >
                Docs
              </a>
              <a
                href="/flywheel"
                onClick={(e) => handleNav('/flywheel', e)}
                className="px-3 py-1.5 rounded-lg hover:text-black dark:hover:text-white transition-colors"
              >
                Flywheel
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {isConnected ? (
              <button
                onClick={() => handleNav('/profile')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {handle}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="b b1 text-xs px-3.5 py-2 font-medium"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Sign in with X</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
