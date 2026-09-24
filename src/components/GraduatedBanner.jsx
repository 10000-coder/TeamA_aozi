import React from 'react';
import { ArrowUpRight, CheckCircle2, Flame } from 'lucide-react';
import { GRADUATED_TOKEN } from '../mock/tokens';

export default function GraduatedBanner({ onTrade, onClick }) {
  return (
    <div
      onClick={() => onClick ? onClick(GRADUATED_TOKEN) : onTrade(GRADUATED_TOKEN)}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-emerald-950/20 border-2 border-emerald-500/40 p-6 sm:p-8 backdrop-blur-md cursor-pointer hover:border-emerald-500 transition-all duration-300 shadow-xl group mb-10"
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-emerald-500/30">
        <Flame className="w-3.5 h-3.5 fill-current" />
        <span>Graduated</span>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <img
            src={GRADUATED_TOKEN.image}
            alt="Aozi Bot"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-lg border-2 border-emerald-500/30 group-hover:scale-105 transition-transform"
          />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {GRADUATED_TOKEN.name}
              </h3>
              <span className="mono text-sm px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/30">
                {GRADUATED_TOKEN.ticker}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl line-clamp-2 mb-2">
              {GRADUATED_TOKEN.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {GRADUATED_TOKEN.status}
              </span>
              <span className="text-neutral-400">·</span>
              <span className="mono text-neutral-600 dark:text-neutral-300">
                {GRADUATED_TOKEN.poolRaised} / {GRADUATED_TOKEN.poolTarget} {GRADUATED_TOKEN.poolCurrency}
              </span>
              <span className="text-neutral-400">·</span>
              <span className="mono text-neutral-600 dark:text-neutral-300">
                mcap: <strong>{GRADUATED_TOKEN.mcap}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-black/5 dark:border-white/10">
          <div className="text-left lg:text-right">
            <div className="mono font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
              {GRADUATED_TOKEN.price}
            </div>
            <div className="text-xs text-neutral-500">pay with SPY</div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTrade(GRADUATED_TOKEN);
            }}
            className="b b1 px-5 py-3 text-sm font-bold shadow-emerald-500/20"
          >
            <span>Buy $AOZI</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
