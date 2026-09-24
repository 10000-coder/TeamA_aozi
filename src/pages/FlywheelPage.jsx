import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, RotateCw } from 'lucide-react';
import { FLYWHEEL_DATA } from '../mock/flywheel';

export default function FlywheelPage({ navigate }) {
  const [dailyVolume, setDailyVolume] = useState(250);

  const perDay = (dailyVolume * 0.01).toFixed(2);
  const perMonth = (dailyVolume * 0.01 * 30).toFixed(2);
  const perYear = Math.floor(dailyVolume * 0.01 * 365);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to coins</span>
      </button>

      <div className="mb-14 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
          <RotateCw className="w-3.5 h-3.5 animate-spin" />
          <span>The Perpetual Flywheel</span>
        </div>

        <h1 className="serif text-5xl sm:text-7xl font-normal tracking-tight mb-4">
          1% of every trade. <br/><span className="italic">Every time.</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          1% of every trade aozi makes flows into one wallet, and that wallet buys back the <strong>$AOZI</strong> token.
        </p>
      </div>

      <div className="bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 border border-emerald-500/20 mb-16">
        <h3 className="text-2xl font-bold mb-2">Spin it yourself</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
          Drag the day's volume. Watch the 1% stack up and the wheel speed up.
        </p>

        <div className="space-y-6 max-w-xl mb-8">
          <div>
            <div className="flex justify-between items-center text-sm font-semibold mb-2">
              <span>If aozi trades:</span>
              <span className="mono text-emerald-600 dark:text-emerald-400 font-bold text-lg">{dailyVolume} ETH / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="5000"
              value={dailyVolume}
              onChange={(e) => setDailyVolume(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div className="bg-white/80 dark:bg-[#101212]/80 p-4 rounded-2xl">
            <div className="text-xs text-neutral-500">Per day</div>
            <div className="mono text-xl font-bold text-emerald-600 dark:text-emerald-400">{perDay} ETH</div>
          </div>
          <div className="bg-white/80 dark:bg-[#101212]/80 p-4 rounded-2xl">
            <div className="text-xs text-neutral-500">Per month</div>
            <div className="mono text-xl font-bold text-emerald-600 dark:text-emerald-400">{perMonth} ETH</div>
          </div>
          <div className="bg-white/80 dark:bg-[#101212]/80 p-4 rounded-2xl">
            <div className="text-xs text-neutral-500">Per year</div>
            <div className="mono text-xl font-bold text-emerald-600 dark:text-emerald-400">{perYear.toLocaleString()} ETH</div>
          </div>
        </div>
      </div>
    </div>
  );
}
