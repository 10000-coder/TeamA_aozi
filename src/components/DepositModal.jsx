import React, { useState, useEffect } from 'react';
import { X, Copy, Check, QrCode, ShieldAlert, ArrowDownLeft } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';

export default function DepositModal({ isOpen, onClose }) {
  const { address } = useWallet();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

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

  const fullAddress = "0x71C8A3E39F93F2B6454a8C3762886f77B96ea49B";

  const handleCopy = () => {
    navigator.clipboard?.writeText(fullAddress);
    setCopied(true);
    addToast('Address copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
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
            <ArrowDownLeft className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-base">Deposit with a QR</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 flex flex-col items-center text-center">
          <div className="p-4 bg-white rounded-3xl shadow-md border border-black/10 mb-5">
            <svg
              className="w-48 h-48"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" fill="white" />
              <rect x="10" y="10" width="24" height="24" rx="4" fill="black" />
              <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="18" width="8" height="8" rx="1" fill="black" />

              <rect x="66" y="10" width="24" height="24" rx="4" fill="black" />
              <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="74" y="18" width="8" height="8" rx="1" fill="black" />

              <rect x="10" y="66" width="24" height="24" rx="4" fill="black" />
              <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="74" width="8" height="8" rx="1" fill="black" />

              <rect x="38" y="12" width="6" height="6" fill="black" />
              <rect x="48" y="12" width="6" height="6" fill="black" />
              <rect x="56" y="16" width="6" height="6" fill="black" />
              <rect x="38" y="24" width="6" height="6" fill="black" />
              <rect x="46" y="28" width="6" height="6" fill="black" />
              <rect x="54" y="26" width="6" height="6" fill="black" />
              
              <rect x="14" y="40" width="6" height="6" fill="black" />
              <rect x="24" y="44" width="6" height="6" fill="black" />
              <rect x="34" y="38" width="6" height="6" fill="black" />
              <rect x="44" y="42" width="12" height="12" rx="2" fill="#10b981" />
              <rect x="60" y="40" width="6" height="6" fill="black" />
              <rect x="70" y="46" width="6" height="6" fill="black" />
              <rect x="80" y="40" width="6" height="6" fill="black" />

              <rect x="38" y="66" width="6" height="6" fill="black" />
              <rect x="48" y="62" width="6" height="6" fill="black" />
              <rect x="58" y="68" width="6" height="6" fill="black" />
              <rect x="42" y="78" width="6" height="6" fill="black" />
              <rect x="52" y="82" width="6" height="6" fill="black" />
              <rect x="66" y="76" width="6" height="6" fill="black" />
              <rect x="78" y="70" width="6" height="6" fill="black" />
              <rect x="80" y="82" width="6" height="6" fill="black" />
            </svg>
          </div>

          <p className="text-xs text-neutral-500 mb-3">
            Scan it or copy the address. ETH or tokenized stocks on <strong>Robinhood Chain</strong>.
          </p>

          <div className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-3 flex items-center justify-between gap-2 border border-black/5 dark:border-white/5">
            <span className="mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
              {fullAddress}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white dark:bg-neutral-800 shadow-sm hover:scale-105 transition-all text-neutral-700 dark:text-neutral-300"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 font-semibold text-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
