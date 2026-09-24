import React, { useState } from 'react';
import { ArrowUpRight, Check, X, Flame, ShieldAlert, Sparkles, Send, Coins } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Launch({ navigate }) {
  const { addToast } = useToast();
  const [ticker, setTicker] = useState('SOUP');
  const [name, setName] = useState('Soup Season');
  const [simulated, setSimulated] = useState(false);

  const handleSimulate = (e) => {
    e.preventDefault();
    setSimulated(true);
    addToast('Simulating launch on Robinhood Chain...', 'info');
    setTimeout(() => {
      addToast(`$${ticker.toUpperCase()} launched on Pons! Creator fees assigned to you.`, 'success');
    }, 1000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 md:py-20 animate-fade-in">
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          How to launch
        </div>

        <h1 className="serif text-5xl sm:text-7xl font-normal tracking-tight leading-[1.08] mb-6">
          Tweet a picture. <span className="italic">Get a coin.</span>
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Tag <strong className="text-black dark:text-white font-semibold">@aozibot</strong> with launch, a name, a ticker and an image. It builds the coin on Pons from your aozi wallet and replies with the link. The Pons fee is 0.0005 ETH.
        </p>
      </div>

      <div className="mb-20">
        <h2 className="serif text-3xl font-normal mb-8">Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 block">
              Example 1 · On your own post
            </span>

            <div className="space-y-4">
              <div className="flex gap-3 text-sm">
                <div className="w-9 h-9 rounded-full bg-orange-500/20 text-orange-600 font-bold flex items-center justify-center text-xs shrink-0">
                  SS
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">soup szn</span>
                    <span className="text-xs text-neutral-400">@soupszn · now</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    @aozibot launch <span className="font-semibold text-emerald-600 dark:text-emerald-400">$SOUP</span> Soup Season
                  </p>
                </div>
              </div>

              <div className="ml-6 pl-4 border-l-2 border-emerald-500/40 flex gap-3 text-sm pt-2">
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black font-serif text-xs font-bold flex items-center justify-center shrink-0">
                  ao
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">aozi</span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Automated</span>
                    <span className="text-xs text-neutral-400">@aozibot · 3s</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 font-sans">
                    built. <span className="font-semibold text-emerald-600 dark:text-emerald-400">$SOUP</span> is live on pons. bring a spoon
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 block">
              Example 2 · Deep in a thread, on someone else's post
            </span>

            <div className="space-y-4">
              <div className="flex gap-3 text-sm opacity-60">
                <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold flex items-center justify-center text-xs shrink-0">
                  SM
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">snail mail</span>
                    <span className="text-xs text-neutral-400">@snailmail · 2h</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    my snail got there before my package 🐌
                  </p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-600 font-bold flex items-center justify-center text-xs shrink-0">
                  DM
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">dgen mom</span>
                    <span className="text-xs text-neutral-400">@dgenmom · 1m</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    @aozibot launch this <span className="font-semibold text-emerald-600 dark:text-emerald-400">$SNAIL</span> Snail Mail
                  </p>
                </div>
              </div>

              <div className="ml-6 pl-4 border-l-2 border-emerald-500/40 flex gap-3 text-sm pt-2">
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black font-serif text-xs font-bold flex items-center justify-center shrink-0">
                  ao
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">aozi</span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Automated</span>
                    <span className="text-xs text-neutral-400">@aozibot · now</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 font-sans">
                    built. <span className="font-semibold text-emerald-600 dark:text-emerald-400">$SNAIL</span> is live on pons. it'll get there
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-500 mt-4 italic">
              aozi takes the image from the post you replied to. A name or ticker in your reply wins.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="serif text-3xl font-normal mb-8">The rules</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08]">
            <h3 className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Image</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-1">Required</p>
            <p className="text-xs text-neutral-500">No picture, no coin. It becomes the token's on-chain logo.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08]">
            <h3 className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Ticker</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-1">2 to 10 letters or numbers</p>
            <p className="text-xs text-neutral-500">Always preceded by a $. e.g. $FROG or $AOZI.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08]">
            <h3 className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Name</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-1">Up to 32 characters</p>
            <p className="text-xs text-neutral-500">Clear token name following the ticker.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08]">
            <h3 className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Limit</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-1">Up to 3 launches per account per day</p>
            <p className="text-xs text-neutral-500">To maintain ecosystem health and prevent spam.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08]">
            <h3 className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Unique</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-1">One live coin per ticker</p>
            <p className="text-xs text-neutral-500">The house reserves live tickers to prevent duplicate collisions on the curve.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08]">
            <h3 className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Launch Cost</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-1">0.0005 ETH Pons fee</p>
            <p className="text-xs text-neutral-500">First launch is free on the house. Additional launches draw from aozi wallet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
