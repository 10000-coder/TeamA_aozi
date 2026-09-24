import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getTokenIconSvg } from '../utils/visuals';

export default function CoinCard({ token, onTrade, onClick }) {
  const imgSrc = token.image || getTokenIconSvg(token.ticker, token.name);

  return (
    <div
      onClick={() => onClick ? onClick(token) : onTrade(token)}
      className="group relative bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.08] hover:border-emerald-500/50 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start gap-3 mb-3.5">
          <div className="relative flex-shrink-0">
            <img
              src={imgSrc}
              alt={token.name}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-cover border border-black/5 dark:border-white/10 group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getTokenIconSvg(token.ticker, token.name);
              }}
            />
            {token.graduated && (\n              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-bold text-sm sm:text-base truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {token.name}
              </h3>
              <span className="mono text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
                {token.ticker}
              </span>
            </div>

            <div className="text-xs text-neutral-500 truncate mt-0.5">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{token.creator}</span>
              <span className="opacity-75"> {token.tweetText || 'asked aozi to launch'}</span>
            </div>
          </div>
        </div>

        <div className="mb-3.5">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-neutral-500">{token.progress || 0}% to graduation</span>
            <span className="mono text-neutral-700 dark:text-neutral-300">
              {token.raised || '0.00'} / {token.target || '4.2'} {token.currency || 'ETH'}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(2, token.progress || 0))}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
        <div className="text-xs text-neutral-500">
          <span className="mono font-semibold text-neutral-800 dark:text-neutral-200">
            {token.payWith || '0.08168 ETH'}
          </span>
          <span className="ml-1 opacity-70">pay with</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTrade(token);
          }}
          className="b b2 text-xs px-3 py-1.5 font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <span>Buy</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
