import React, { useState } from 'react';
import { Search, Sparkles, TrendingUp, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { MOCK_TRENDING, MOCK_WHO_TO_FOLLOW } from '../mock/porchTalk';
import { getAvatarSvg } from '../utils/visuals';

export default function Widgets({ onSearchChange, searchQuery, navigate }) {
  const [following, setFollowing] = useState({});

  const toggleFollow = (handle) => {
    setFollowing(prev => ({ ...prev, [handle]: !prev[handle] }));
  };

  return (
    <div className="w-[320px] lg:w-[350px] hidden xl:flex flex-col gap-4 py-3 pl-4 flex-shrink-0 select-none">

      {/* Search Input Box */}
      <div className="sticky top-0 z-20 pt-1 pb-2 bg-inherit backdrop-blur-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search DEMO"
            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Meet Aozi Bot Top Hero Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 backdrop-blur-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          aozi is on X · Tag @aozibot
        </div>

        <h2 className="serif text-3xl font-normal tracking-tight mb-2">
          Meet <span className="italic">aozi</span> bot
        </h2>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
          Tag <strong>@aozibot</strong> on X. It talks back like Ozzy's AI, and if your tweet has a picture, a name and a ticker, it launches the coin on Pons.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/launch')}
            className="b b1 px-4 py-2 text-xs font-bold rounded-xl"
          >
            <span>Launch Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => navigate('/flywheel')}
            className="b b2 px-3.5 py-2 text-xs font-semibold rounded-xl"
          >
            <span>Flywheel (1%)</span>
          </button>
        </div>
      </div>

      {/* What's Happening / Trending Card */}
      <div className="rounded-3xl p-4 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]">
        <h3 className="font-extrabold text-lg px-2 pt-1 pb-3 tracking-tight">
          What's happening
        </h3>

        <div className="flex flex-col">
          {MOCK_TRENDING.map((item, idx) => (
            <div
              key={idx}
              className="px-2 py-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => onSearchChange && onSearchChange(item.title.replace('#', ''))}
            >
              <div className="text-[11px] text-neutral-500 leading-none mb-1">
                {item.category}
              </div>
              <div className="font-bold text-sm leading-tight text-neutral-900 dark:text-neutral-100">
                {item.title}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                {item.tweetsCount} posts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow Card */}
      <div className="rounded-3xl p-4 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]">
        <h3 className="font-extrabold text-lg px-2 pt-1 pb-3 tracking-tight">
          Who to follow
        </h3>

        <div className="flex flex-col gap-1">
          {MOCK_WHO_TO_FOLLOW.map((person, idx) => {
            const isFollowed = following[person.handle];

            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={person.avatar || getAvatarSvg(person.handle, person.name)}
                    alt={person.name}
                    className="w-10 h-10 rounded-full flex-shrink-0 border border-black/10 dark:border-white/10"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm truncate hover:underline cursor-pointer">
                      {person.name}
                    </span>
                    <span className="text-xs text-neutral-500 truncate">
                      {person.handle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(person.handle)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isFollowed 
                      ? 'border border-black/20 dark:border-white/20 text-neutral-800 dark:text-neutral-200 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30'
                      : 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info & Disclaimers */}
      <div className="px-3 text-[12px] text-neutral-400 dark:text-neutral-500 flex flex-wrap gap-x-3 gap-y-1 leading-relaxed">
        <button onClick={() => navigate('/terms')} className="hover:underline">Terms of Service</button>
        <button onClick={() => navigate('/privacy')} className="hover:underline">Privacy Policy</button>
        <button onClick={() => navigate('/docs')} className="hover:underline">Docs</button>
        <span>© 2026 aozi.family</span>
      </div>

    </div>
  );
}
