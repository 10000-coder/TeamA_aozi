import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  Flame, 
  Rocket, 
  BookOpen, 
  Bell, 
  Bookmark, 
  User, 
  Moon, 
  Sun, 
  Feather, 
  Sparkles,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { getAvatarSvg } from '../utils/visuals';

export default function Sidebar({ currentRoute, navigate, onOpenNewPost }) {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, ethBalance, connectWallet } = useWallet();
  const [notificationsCount, setNotificationsCount] = useState(3);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, route: '/' },
    { id: 'explore', label: 'Explore', icon: Compass, route: '/#tokens', badge: '3' },
    { id: 'flywheel', label: 'Flywheel', icon: Flame, route: '/flywheel' },
    { id: 'launch', label: 'Launch', icon: Rocket, route: '/launch' },
    { id: 'docs', label: 'Docs', icon: BookOpen, route: '/docs' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationsCount > 0 ? `${notificationsCount}` : null },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User, route: '/profile' },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between w-[220px] lg:w-[260px] h-screen sticky top-0 px-3 lg:px-4 py-4 border-r border-black/[0.08] dark:border-white/[0.08] select-none flex-shrink-0">

      {/* Top Section */}
      <div className="flex flex-col gap-1">
        {/* Brand Logo & Aozi Icon */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group mb-2"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <span className="font-serif italic text-2xl font-bold text-white">a</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight">aozi.family</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide uppercase">Robinhood Pons</span>
          </div>
        </button>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.route && (currentRoute === item.route || (item.route === '/' && currentRoute === '/'));

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'notifications') {
                    setNotificationsCount(0);
                    navigate('/#tokens');
                  } else if (item.route) {
                    navigate(item.route);
                  }
                }}
                className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-[16px] font-semibold transition-all group ${
                  isActive 
                    ? 'text-neutral-900 dark:text-white bg-black/[0.06] dark:bg-white/[0.08] font-bold' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-500 text-white leading-none">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between px-3.5 py-2.5 mt-1 rounded-2xl text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-4">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 font-mono">
            {theme}
          </span>
        </button>

        {/* Post Button */}
        <div className="mt-4 px-1">
          <button
            onClick={() => {
              if (onOpenNewPost) {
                onOpenNewPost();
              } else {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('tweet-composer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="w-full b b1 py-3 px-4 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Feather className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>
      </div>

      {/* User Card at Bottom */}
      <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center justify-between p-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={getAvatarSvg('@you', 'You')}
              alt="You"
              className="w-10 h-10 rounded-full flex-shrink-0 border border-black/10 dark:border-white/10"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm truncate">you</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">@you · {ethBalance} ETH</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
        </button>
      </div>

    </aside>
  );
}
