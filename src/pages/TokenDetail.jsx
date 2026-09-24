import { getTokenIconSvg, getAvatarSvg } from "../utils/visuals";
import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Copy, Check, ExternalLink, ShieldCheck, Flame, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import { GRADUATED_TOKEN, MOCK_TOKENS } from '../mock/tokens';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';

export default function TokenDetail({ address, onBack, onOpenTrade }) {
  const { isConnected, ethBalance, holdings, buyToken, sellToken, connectWallet } = useWallet();
  const { addToast } = useToast();

  const [copied, setCopied] = useState(false);
  const [tradeMode, setTradeMode] = useState('buy');
  const [tradeAmount, setTradeAmount] = useState('0.01');
  const [timeframe, setTimeframe] = useState('24H');

  const token = useMemo(() => {
    if (!address) return GRADUATED_TOKEN;
    if (address.toLowerCase() === GRADUATED_TOKEN.address.toLowerCase()) return GRADUATED_TOKEN;
    const found = MOCK_TOKENS.find(t => t.address.toLowerCase() === address.toLowerCase());
    return found || {
      ...GRADUATED_TOKEN,
      name: "Token " + address.slice(0, 6),
      ticker: "$TOKEN",
      address: address
    };
  }, [address]);

  const [trades, setTrades] = useState([
    { id: 1, time: '5h', wallet: '0xa2f3…af6e', type: 'Sell', amount: '0.002 SPY', tokens: '337,888 AOZI' },
    { id: 2, time: '5h', wallet: '0x9c35…4370', type: 'Sell', amount: '0.002 SPY', tokens: '473,147 AOZI' },
    { id: 3, time: '5h', wallet: '0x9c35…4370', type: 'Sell', amount: '0.002 SPY', tokens: '429,410 AOZI' },
    { id: 4, time: '13h', wallet: '0x7765…acb8', type: 'Sell', amount: '0.009 SPY', tokens: '1,921,188 AOZI' },
    { id: 5, time: '18h', wallet: '0x0e34…1a5e', type: 'Sell', amount: '0.003 SPY', tokens: '556,557 AOZI' },
    { id: 6, time: '19h', wallet: '0x415d…aa29', type: 'Sell', amount: '0.008 SPY', tokens: '1,720,136 AOZI' },
    { id: 7, time: '21h', wallet: '0xb863…2b31', type: 'Sell', amount: '0.031 SPY', tokens: '6,332,395 AOZI' },
    { id: 8, time: '23h', wallet: '0x000c…6d7c', type: 'Sell', amount: '0.167 SPY', tokens: '32,070,553 AOZI' },
    { id: 9, time: '1d', wallet: '0xadde…9bf7', type: 'Buy', amount: '0.010 SPY', tokens: '1,773,336 AOZI' },
    { id: 10, time: '1d', wallet: '0x000c…6d7c', type: 'Buy', amount: '0.177 SPY', tokens: '33,062,425 AOZI' },
  ]);

  const userHolding = holdings[token.address] || 0;
  const numAmount = parseFloat(tradeAmount) || 0;
  const protocolFee = +(numAmount * 0.01).toFixed(6);
  const netAmount = Math.max(0, +(numAmount - protocolFee).toFixed(6));
  const estimatedTokens = Math.floor(netAmount * 1250000);

  const handleCopy = () => {
    navigator.clipboard?.writeText(token.address);
    setCopied(true);
    addToast('Contract address copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteTrade = (e) => {
    e.preventDefault();
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (numAmount <= 0) {
      addToast('Please enter an amount', 'error');
      return;
    }

    if (tradeMode === 'buy') {
      const ok = buyToken(token, numAmount);
      if (ok) {
        setTrades(prev => [
          {
            id: Date.now(),
            time: 'just now',
            wallet: '0x71C…a49B',
            type: 'Buy',
            amount: `${numAmount} ${token.currency || 'ETH'}`,
            tokens: `${estimatedTokens.toLocaleString()} ${token.ticker.replace('$', '')}`
          },
          ...prev
        ]);
      }
    } else {
      const ok = sellToken(token, Math.floor(numAmount));
      if (ok) {
        setTrades(prev => [
          {
            id: Date.now(),
            time: 'just now',
            wallet: '0x71C…a49B',
            type: 'Sell',
            amount: `${(numAmount * 0.0000008).toFixed(4)} ETH`,
            tokens: `${Math.floor(numAmount).toLocaleString()} ${token.ticker.replace('$', '')}`
          },
          ...prev
        ]);
      }
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 md:py-12 animate-fade-in">
      <button
        onClick={onBack}
        className="text-xs font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-6 flex items-center gap-1"
      >
        ← Back to Coins
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative">
            <img
              src={token.image}
              alt={token.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border border-black/10 dark:border-white/10 shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getTokenIconSvg(token.ticker, token.name);
              }}
            />
            {token.graduated && (
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow">
                ✓
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{token.name}</h1>
              <span className="mono text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200">
                {token.ticker}
              </span>
              {token.graduated && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Graduated
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
              <button
                onClick={handleCopy}
                className="mono flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors"
              >
                <span>{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
              <span>·</span>
              <a
                href={token.dexUrl || `https://robinhoodchain.blockscout.com/address/${token.address}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-0.5 hover:text-black dark:hover:text-white transition-colors"
              >
                <span>Blockscout</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span>·</span>
              <span>Pair: <strong>{token.poolCurrency || token.currency || 'ETH'}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-left md:text-right">
          <div>
            <div className="text-xs text-neutral-400">Current Price</div>
            <div className="serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              {token.price || '0.08168 ETH'}
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">Market Cap</div>
            <div className="serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {token.mcap || '12.4 ETH'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-sm">Bonding Curve Price Trend</h3>
              </div>

              <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl text-xs font-semibold">
                {['1H', '24H', '7D', 'ALL'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      timeframe === tf
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'text-neutral-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" strokeDasharray="3 3" className="text-black/5 dark:text-white/5" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeDasharray="3 3" className="text-black/5 dark:text-white/5" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" strokeDasharray="3 3" className="text-black/5 dark:text-white/5" />

                <path
                  d="M 0,180 Q 120,170 200,120 T 380,60 T 500,30 L 500,200 L 0,200 Z"
                  fill="url(#curveGradient)"
                />

                <path
                  d="M 0,180 Q 120,170 200,120 T 380,60 T 500,30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <circle cx="500" cy="30" r="5" className="fill-emerald-500 ring-4 ring-emerald-500/20" />
              </svg>
            </div>

            <div className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-neutral-500">Graduation Progress (Target: {token.poolTarget || token.target || '4.2'} {token.poolCurrency || token.currency || 'ETH'})</span>
                <span className="mono text-emerald-600 dark:text-emerald-400 font-bold">{token.progress || 0}% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(3, token.progress || 0))}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] shadow-sm">
            <h3 className="font-bold text-base mb-4">Recent Trades on Robinhood Chain</h3>
            <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04] text-xs">
              {trades.map(t => (
                <div key={t.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      t.type === 'Buy'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                      {t.type}
                    </span>
                    <span className="mono text-neutral-500">{t.wallet}</span>
                    <span className="text-neutral-400">· {t.time}</span>
                  </div>
                  <div className="text-right">
                    <div className="mono font-semibold">{t.amount}</div>
                    <div className="text-[11px] text-neutral-400">{t.tokens}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#101212]/90 backdrop-blur-md border-2 border-emerald-500/30 shadow-xl">
            <div className="flex rounded-2xl bg-neutral-100 dark:bg-neutral-900 p-1 mb-5">
              <button
                type="button"
                onClick={() => setTradeMode('buy')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  tradeMode === 'buy'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Buy {token.ticker}
              </button>
              <button
                type="button"
                onClick={() => setTradeMode('sell')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  tradeMode === 'sell'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>

            <form onSubmit={handleExecuteTrade} className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 font-medium">
                  <span>{tradeMode === 'buy' ? 'Pay Amount' : 'Sell Tokens'}</span>
                  <span className="mono">
                    Balance: {tradeMode === 'buy' ? `${ethBalance} ETH` : `${userHolding.toLocaleString()} ${token.ticker.replace('$', '')}`}
                  </span>
                </div>
                <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-3 border border-transparent focus-within:border-emerald-500">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent text-lg font-bold mono outline-none"
                  />
                  <span className="text-xs font-bold mono px-2 text-neutral-400">
                    {tradeMode === 'buy' ? (token.currency || 'ETH') : token.ticker.replace('$', '')}
                  </span>
                </div>
              </div>

              {tradeMode === 'buy' && (
                <div className="flex gap-2">
                  {['0.01', '0.05', '0.1', '0.5'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setTradeAmount(val)}
                      className="flex-1 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs mono font-bold transition-colors"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Protocol Flywheel Fee (1%):</span>
                  <span className="mono">{protocolFee} {token.currency || 'ETH'}</span>
                </div>
                <div className="flex justify-between font-semibold pt-1 border-t border-black/[0.04] dark:border-white/[0.04]">
                  <span>You Receive (est.):</span>
                  <span className="mono text-emerald-600 dark:text-emerald-400">
                    {tradeMode === 'buy' ? `${estimatedTokens.toLocaleString()} ${token.ticker}` : `${(numAmount * 0.0000008).toFixed(4)} ETH`}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl text-sm font-bold shadow-lg transition-all ${
                  tradeMode === 'buy'
                    ? 'b b1 text-white shadow-emerald-500/20'
                    : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                }`}
              >
                {!isConnected ? 'Connect Wallet with X' : `${tradeMode === 'buy' ? 'Buy' : 'Sell'} ${token.ticker}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
