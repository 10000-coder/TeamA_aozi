import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Copy, Check, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ExportKeyModal({ isOpen, onClose }) {
  const { addToast } = useToast();
  const [revealed, setRevealed] = useState(false);
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

  const mockPrivateKey = "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d";

  const handleCopy = () => {
    navigator.clipboard?.writeText(mockPrivateKey);
    setCopied(true);
    addToast('Private key copied! Do not share it with anyone.', 'success');
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
          <div className="flex items-center gap-2 text-amber-500">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-base text-black dark:text-white">Export Private Key</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            <strong>Warning:</strong> Anyone with your private key has complete control over your funds and launched coins. Never share it with anyone or paste it into forms.
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
              <span>Your Robinhood Chain Private Key</span>
              <button
                type="button"
                onClick={() => setRevealed(!revealed)}
                className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{revealed ? 'Hide' : 'Reveal'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 mono text-xs break-all leading-relaxed font-semibold">
              {revealed ? mockPrivateKey : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-3 rounded-2xl b b1 font-bold text-sm justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>Copy Private Key</span>
          </button>
        </div>
      </div>
    </div>
  );
}
