import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Copy, Check, RefreshCw, Zap, TrendingUp, ShieldCheck, Flame } from 'lucide-react';
import { FLYWHEEL_DATA } from '../mock/flywheel';
import { useToast } from '../context/ToastContext';

export default function Flywheel({ navigate }) {
  const { addToast } = useToast();
  const [dailyVolume, setDailyVolume] = useState(250);
  const [copied, setCopied] = useState(false);

  const calc = useMemo(() => {
    const day = dailyVolume * 0.01;
    const month = day * 30;
    const year = day * 365;
    return {
      perDay: day >= 10 ? day.toFixed(2) : day.toFixed(3),
      perMonth: month.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      perYear: Math.round(year).toLocaleString('en-US')
    };
  }, [dailyVolume]);

  const spinDuration = Math.max(1.2, 16 - (dailyVolume / 25000) * 14.5);

  const handleCopyWallet = () => {
    navigator.clipboard?.writeText(FLYWHEEL_DATA.treasuryWallet);
    setCopied(true);
    addToast('Treasury wallet address copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-12 md:py-20 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Protocol Economics
          </div>

          <h1 className="serif text-5xl sm:text-7xl font-normal tracking-tight leading-[1.05] mb-6">
            The flywheel: <br />
            <span className="italic">1% of every trade</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
            1% of every trade aozi makes flows into one wallet, and that wallet buys back the <strong className="text-black dark:text-white">$AOZI token</strong>. Trade more, buy back more.
          </p>
        </div>

        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl"></div>

          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            style={{
              animation: `spin ${spinDuration}s linear infinite`,
            }}
          >
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" className="text-neutral-200 dark:text-neutral-800" fill="none" strokeDasharray="4 6" />
            <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="2" className="text-emerald-500/40" fill="none" />
            <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-700" fill="none" />

            <circle cx="100" cy="28" r="7" className="fill-emerald-500" />
            <circle cx="168" cy="80" r="6" className="fill-teal-400" />
            <circle cx="145" cy="160" r="7" className="fill-emerald-600" />
            <circle cx="55" cy="160" r="6" className="fill-emerald-400" />
            <circle cx="32" cy="80" r="7" className="fill-teal-500" />
          </svg>

          <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-white dark:bg-[#101212] shadow-2xl border-2 border-emerald-500/40 flex flex-col items-center justify-center text-center p-2 z-10">
            <span className="serif italic text-2xl font-bold text-emerald-600 dark:text-emerald-400">+1%</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">Continuous</span>
            <span className="text-[11px] font-mono font-bold text-neutral-700 dark:text-neutral-300">Buyback</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-950/20 via-neutral-900/10 to-teal-950/20 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-bold text-lg sm:text-xl">The Treasury</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">Live on-chain</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500">
              Every fee is a transfer into one public wallet. Watch it fill.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyWallet}
              className="px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>{FLYWHEEL_DATA.treasuryWallet.slice(0, 6)}...{FLYWHEEL_DATA.treasuryWallet.slice(-4)}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <a
              href={FLYWHEEL_DATA.blockscoutUrl}
              target="_blank"
              rel="noreferrer"
              className="b b2 text-xs px-3.5 py-2 flex items-center gap-1"
            >
              <span>Blockscout</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div>
            <div className="text-xs text-neutral-500 mb-1">In the treasury now (SPY)</div>
            <div className="serif text-3xl sm:text-4xl font-normal text-emerald-600 dark:text-emerald-400">
              {FLYWHEEL_DATA.spyInTreasury} SPY
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">$AOZI trades in SPY, so buybacks are in SPY</div>
          </div>

          <div>
            <div className="text-xs text-neutral-500 mb-1">In the treasury now (ETH)</div>
            <div className="serif text-3xl sm:text-4xl font-normal text-neutral-800 dark:text-neutral-100">
              {FLYWHEEL_DATA.ethInTreasury} ETH
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">Pending conversion to buyback currency</div>
          </div>

          <div>
            <div className="text-xs text-neutral-500 mb-1">Trades that paid in</div>
            <div className="serif text-3xl sm:text-4xl font-normal text-neutral-800 dark:text-neutral-100">
              {FLYWHEEL_DATA.totalTrades}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">Cumulative on-chain transactions</div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="max-w-2xl mb-10">
          <h2 className="serif text-3xl sm:text-4xl font-normal mb-2">How it spins</h2>
          <p className="text-neutral-500 text-sm">
            Five stops, one direction, no brakes. 1% of every trade, round and round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {FLYWHEEL_DATA.steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-white/70 dark:bg-[#101212]/70 rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08] relative flex flex-col justify-between"
            >
              <div>
                <span className="serif italic text-3xl text-emerald-600 dark:text-emerald-400 block mb-3 font-normal">
                  {step.num}
                </span>
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < 4 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 z-10 flex items-center justify-center text-xs font-bold pointer-events-none">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-black/[0.08] dark:border-white/[0.1] shadow-xl mb-20">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2">
            Interactive Calculator
          </span>
          <h2 className="serif text-3xl sm:text-4xl font-normal mb-2">
            Spin it yourself
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Drag the day's volume. Watch the 1% stack up and the wheel speed up.
          </p>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              If aozi trades:
            </span>
            <span className="serif text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {dailyVolume.toLocaleString()} ETH <span className="text-sm text-neutral-500 font-sans font-normal">a day</span>
            </span>
          </div>

          <input
            type="range"
            min="0.1"
            max="25000"
            step="10"
            value={dailyVolume}
            onChange={(e) => setDailyVolume(parseFloat(e.target.value))}
            className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-xs text-neutral-400 font-mono mt-2">
            <span>0.1 ETH</span>
            <span>25,000 ETH</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03]">
            <span className="text-xs text-neutral-500 block mb-1">Per day (1%)</span>
            <span className="serif text-3xl sm:text-4xl font-normal text-emerald-600 dark:text-emerald-400">
              {calc.perDay} ETH
            </span>
            <span className="text-[11px] text-neutral-400 block mt-1">Directly bought back from market</span>
          </div>

          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03]">
            <span className="text-xs text-neutral-500 block mb-1">Per month</span>
            <span className="serif text-3xl sm:text-4xl font-normal text-neutral-800 dark:text-neutral-100">
              {calc.perMonth} ETH
            </span>
            <span className="text-[11px] text-neutral-400 block mt-1">30-day cumulative run rate</span>
          </div>

          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03]">
            <span className="text-xs text-neutral-500 block mb-1">Per year</span>
            <span className="serif text-3xl sm:text-4xl font-normal text-neutral-800 dark:text-neutral-100">
              {calc.perYear} ETH
            </span>
            <span className="text-[11px] text-neutral-400 block mt-1">Annualized deflationary pressure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
