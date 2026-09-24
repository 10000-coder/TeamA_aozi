import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export default function TradeModal({ token, isOpen, onClose }) {
  const { isConnected, ethBalance, holdings, buyToken, sellToken, connectWallet } = useWallet();
  const [tab, setTab] = useState('buy');
  const [amount, setAmount] = useState('0.05');

  if (!isOpen || !token) return null;

  const currentHoldings = holdings[token.address] || 0;
  const isGraduated = token.graduated;
  const currency = isGraduated ? 'SPY' : 'ETH';

  const handleAction = (e) => {
    e.preventDefault();
    if (!isConnected) {
      connectWallet();
      return;
    }
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;

    if (tab === 'buy') {
      const ok = buyToken(token, num);
      if (ok) onClose();
    } else {
      const ok = sellToken(token, Math.floor(num));
      if (ok) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/40 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-white dark:bg-[#101212] rounded-3xl p-6 shadow-2xl border border-black/[0.08] dark:border-white/[0.1] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-neutral-400 hover:text-black dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <img
            src={token.image}
            alt={token.name}
            className="w-12 h-12 rounded-2xl object-cover border border-black/5 dark:border-white/10"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{token.name}</h3>
              <span className="mono text-xs font-semibold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                {token.ticker}
              </span>
            </div>
            <div className="text-xs text-neutral-500">
              {token.graduated ? 'Graduated on Uniswap' : `Pons Curve: ${token.progress || 0}% filled`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => { setTab('buy'); setAmount('0.05'); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'buy' ? 'bg-white dark:bg-[#181c1a] text-emerald-600 shadow-sm' : 'text-neutral-500'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => { setTab('sell'); setAmount(currentHoldings.toString()); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'sell' ? 'bg-white dark:bg-[#181c1a] text-rose-600 shadow-sm' : 'text-neutral-500'
            }`}
          >
            Sell
          </button>
        </div>

        <form onSubmit={handleAction}>
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs text-neutral-500 mb-1.5 font-medium">
              <span>{tab === 'buy' ? `Amount to spend (${currency})` : `Amount to sell (${token.ticker})`}</span>
              <span>{tab === 'buy' ? `Wallet: ${ethBalance} ${currency}` : `Held: ${currentHoldings.toLocaleString()} ${token.ticker}`}</span>
            </div>

            <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-3">
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent border-0 outline-none flex-1 font-mono font-bold text-lg"
              />
              <span className="mono text-xs font-bold text-neutral-500 ml-2">
                {tab === 'buy' ? currency : token.ticker}
              </span>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-3.5 mb-5 space-y-1.5 text-xs text-neutral-500">
            <div className="flex justify-between">
              <span>Flywheel Buyback Fee</span>
              <span className="font-semibold text-emerald-600">1.0%</span>
            </div>
            <div className="flex justify-between">
              <span>Slippage Tolerance</span>
              <span>0.5%</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full b b1 py-3.5 text-sm font-bold justify-center"
          >
            <span>
              {!isConnected
                ? 'Sign in with X to Trade'
                : tab === 'buy'
                ? `Confirm Buy with ${amount || '0'} ${currency}`
                : `Confirm Sell ${amount || '0'} ${token.ticker}`}
            </span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
