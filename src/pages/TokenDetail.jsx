import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, ExternalLink } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { GRADUATED_TOKEN, MOCK_TOKENS } from '../mock/tokens';

export default function TokenDetail({ address, onOpenTrade, navigate }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [timeframe, setTimeframe] = useState('24H');

  const token =
    (address === GRADUATED_TOKEN.address ? GRADUATED_TOKEN : null) ||
    MOCK_TOKENS.find(t => t.address.toLowerCase() === (address || '').toLowerCase()) ||
    GRADUATED_TOKEN;

  const handleCopy = () => {
    navigator.clipboard?.writeText(token.address);
    setCopied(true);
    addToast('Contract address copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to coins</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={token.image}
                  alt={token.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-black/10 dark:border-white/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">{token.name}</h1>
                    <span className="mono text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      {token.ticker}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                    <span>Launched by {token.creator}</span>
                    <span>·</span>
                    <button
                      onClick={handleCopy}
                      className="mono flex items-center gap-1 hover:text-black dark:hover:text-white"
                    >
                      <span>{token.address.slice(0, 6)}…{token.address.slice(-4)}</span>
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://robinhoodchain.blockscout.com/address/${token.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="b b2 text-xs px-3.5 py-2.5"
                >
                  <span>Blockscout</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => onOpenTrade(token)}
                  className="b b1 text-xs px-5 py-2.5 font-bold"
                >
                  <span>Trade {token.ticker}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div>
                <div className="text-xs text-neutral-500">Market Cap</div>
                <div className="mono font-bold text-base sm:text-lg">{token.mcap || '1.8 ETH'}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500">Price</div>
                <div className="mono font-bold text-base sm:text-lg">{token.price || '0.00000084 ETH'}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500">Holders</div>
                <div className="mono font-bold text-base sm:text-lg">{token.holders || 142}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500">Graduation</div>
                <div className="mono font-bold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                  {token.progress || 0}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-sm">Bonding Curve Chart</span>
              <div className="flex gap-1">
                {['1H', '24H', '7D', 'ALL'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${
                      timeframe === t
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full flex items-end relative overflow-hidden pt-4 pb-2">
              <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,160 Q80,150 140,120 T260,95 T380,60 T500,20 L500,180 L0,180 Z"
                  fill="url(#grad)"
                />
                <path
                  d="M0,160 Q80,150 140,120 T260,95 T380,60 T500,20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08]">
            <h3 className="font-bold text-base mb-3">Bonding Curve Progress</h3>
            <div className="text-xs text-neutral-500 mb-4 leading-relaxed">
              When {token.target || '4.2'} ETH is raised on the curve, the pool deposits to Uniswap v3 and burns LP liquidity forever.
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>{token.progress || 0}% Complete</span>
                <span className="mono">{token.raised || '0.00'} / {token.target || '4.2'} ETH</span>
              </div>
              <div className="w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: `${Math.min(100, Math.max(2, token.progress || 0))}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => onOpenTrade(token)}
              className="w-full b b1 py-3 text-xs font-bold justify-center"
            >
              <span>Instant Buy / Sell</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
