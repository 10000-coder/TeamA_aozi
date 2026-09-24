import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Hero({ onOpenTrade }) {
  const { addToast } = useToast();
  const [ticker, setTicker] = useState('FROG');
  const [name, setName] = useState('Frog Summer');
  const [isTyping, setIsTyping] = useState(false);
  const [launchedToken, setLaunchedToken] = useState({
    ticker: 'FROG',
    name: 'Frog Summer',
    time: 'now',
    replyTime: '4s'
  });

  const handlePost = (e) => {
    e.preventDefault();
    if (!ticker.trim() || !name.trim()) return;

    setIsTyping(true);
    addToast('Simulating launch tweet to @aozibot...', 'info');

    setTimeout(() => {
      setIsTyping(false);
      setLaunchedToken({
        ticker: ticker.toUpperCase().replace('$', ''),
        name: name.trim(),
        time: 'just now',
        replyTime: '2s'
      });
      addToast(`$${ticker.toUpperCase().replace('$', '')} launched on Pons!`, 'success');
    }, 1200);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            aozi is on X · Tag @aozibot
          </div>

          <h1 className="serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05] mb-6">
            Meet <span className="italic">aozi</span> bot
          </h1>

          <p className="text-lg sm:text-2xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-2xl">
            Tag <strong className="text-black dark:text-white font-semibold">@aozibot</strong> on X. It talks back like Ozzy's AI, and if your tweet has a picture, a name and a ticker, it launches the coin on Pons.
          </p>
        </div>

        <div className="w-full max-w-2xl bg-white/90 dark:bg-[#101212]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.08] dark:border-white/[0.1] relative">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08] text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>Interactive Simulator</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Pons v2 Hook
            </span>
          </div>

          <form onSubmit={handlePost} className="pt-5 pb-6">
            <label className="block text-xs font-medium text-neutral-500 mb-2">
              What's happening? (Format: @aozibot launch $TICKER Name)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl px-4 py-3 border border-transparent focus-within:border-emerald-500 transition-colors">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold mr-2">@aozibot launch $</span>
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  placeholder="TICKER"
                  className="bg-transparent border-0 outline-none w-24 uppercase font-bold text-sm"
                  maxLength={10}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Token Name"
                  className="bg-transparent border-0 outline-none flex-1 text-sm pl-2 border-l border-neutral-300 dark:border-neutral-700"
                  maxLength={30}
                />
              </div>

              <button
                type="submit"
                disabled={isTyping}
                className="b b1 px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>Post</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="space-y-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex gap-3 text-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                YOU
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-bold">you</span>
                  <span className="text-neutral-500 text-xs">@you · {launchedToken.time}</span>
                </div>
                <p className="text-neutral-800 dark:text-neutral-200">
                  @aozibot launch <span className="text-emerald-600 dark:text-emerald-400 font-semibold">${launchedToken.ticker}</span> {launchedToken.name}
                </p>
              </div>
            </div>

            {isTyping ? (
              <div className="pl-12 flex items-center gap-2 text-xs text-neutral-500 font-medium animate-pulse">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                aozi is typing...
              </div>
            ) : (
              <div className="pl-12 flex gap-3 text-sm animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-serif text-sm font-bold shrink-0">
                  ao
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold">aozi</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Automated</span>
                    <span className="text-neutral-500 text-xs">@aozibot · {launchedToken.replyTime}</span>
                  </div>
                  <p className="text-neutral-800 dark:text-neutral-200 mb-3">
                    built. <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">${launchedToken.ticker}</strong> is live on pons. go look before the snipers do
                  </p>

                  <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-sm flex items-center gap-2">
                        <span>${launchedToken.ticker} is live on Pons</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-xs text-neutral-500">From aozi.family · Pool 4.2 ETH target</div>
                    </div>

                    <button
                      onClick={() => onOpenTrade?.({
                        name: launchedToken.name,
                        ticker: `$${launchedToken.ticker}`,
                        address: '0xmock' + Math.random().toString(16).slice(2, 8),
                        progress: 0,
                        raised: '0.00',
                        target: '4.2',
                        currency: 'ETH'
                      })}
                      className="b b2 text-xs px-3.5 py-2"
                    >
                      <span>Trade</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
