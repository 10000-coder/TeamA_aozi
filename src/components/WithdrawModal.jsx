import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';

export default function WithdrawModal({ isOpen, onClose }) {
  const { ethBalance, spyBalance } = useWallet();
  const { addToast } = useToast();

  const [asset, setAsset] = useState('ETH');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentBalance = asset === 'ETH' ? ethBalance : spyBalance;

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!recipient.trim().startsWith('0x') || recipient.trim().length !== 42) {
      addToast('Please enter a valid Robinhood Chain address (0x...)', 'error');
      return;
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      addToast('Please enter a valid amount', 'error');
      return;
    }

    if (numAmount > currentBalance) {
      addToast(`Insufficient ${asset} balance`, 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(`Withdrew ${numAmount} ${asset} to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`, 'success');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/60 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md bg-white dark:bg-[#101212] rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/10 dark:border-white/10 animate-slide-up relative"
      >
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-base">Withdraw Funds</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-500 mb-2">
              Select Asset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['ETH', 'SPY'].map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAsset(a)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    asset === a
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow'
                      : 'bg-transparent border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-500 mb-1.5">
              Recipient Address (Robinhood Chain)
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-3 text-xs mono border border-transparent focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
              <span>Amount</span>
              <span className="mono">Available: {currentBalance} {asset}</span>
            </div>
            <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-3 border border-transparent focus-within:border-emerald-500">
              <input
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent text-sm font-bold mono outline-none"
              />
              <button
                type="button"
                onClick={() => setAmount(currentBalance.toString())}
                className="text-xs mono font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
              >
                MAX
              </button>
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 flex justify-between">
            <span>Network gas fee:</span>
            <span className="mono font-semibold">~0.0001 ETH</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full b b1 py-3 text-sm font-bold justify-center mt-2 shadow-emerald-500/20"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Broadcasting Transaction...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Withdraw {amount || '0'} {asset}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
