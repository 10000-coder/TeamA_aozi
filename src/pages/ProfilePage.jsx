import React, { useState } from 'react';
import { ArrowLeft, Wallet, QrCode, Key, Copy, Check, Shield } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';
import { GRADUATED_TOKEN, MOCK_TOKENS } from '../mock/tokens';

export default function ProfilePage({ navigate, onOpenTrade }) {
  const { isConnected, address, handle, ethBalance, spyBalance, holdings, connectWallet, disconnectWallet } = useWallet();
  const { addToast } = useToast();
  const [showQR, setShowQR] = useState(false);
  const [showExportKey, setShowExportKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
    setCopied(true);
    addToast('Wallet address copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-12">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to coins</span>
      </button>

      <div className="mb-10">
        <h1 className="serif text-5xl sm:text-6xl font-normal tracking-tight mb-3">
          Your <span className="italic">aozi</span> wallet
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
          Sign in with X and aozi makes you a wallet on Robinhood Chain, tied to your X account. Deposit, buy from a reply or right here, and take your money out whenever you want.
        </p>
      </div>

      {!isConnected ? (
        <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-black/[0.06] dark:border-white/[0.08] text-center max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
            <Wallet className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Connect X to view your wallet</h2>
          <p className="text-sm text-neutral-500 mb-8 max-w-md mx-auto">
            Withdraw, deposit and export private keys show up right here after you sign in.
          </p>

          <button
            onClick={connectWallet}
            className="b b1 px-8 py-4 text-base font-bold w-full sm:w-auto"
          >
            <span>Sign in with X</span>
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08] shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                    Connected
                  </span>
                  <span className="font-bold text-sm">{handle}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="mono text-xs text-neutral-500">{address}</span>
                  <button onClick={handleCopyAddress} className="text-neutral-400 hover:text-black dark:hover:text-white">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowQR(true)}
                  className="b b2 text-xs px-3.5 py-2"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Deposit QR</span>
                </button>
                <button
                  onClick={disconnectWallet}
                  className="b b2 text-xs px-3.5 py-2 text-red-600 dark:text-red-400"
                >
                  Disconnect
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/[0.04] dark:border-white/[0.06]">
                <div className="text-xs text-neutral-500 mb-1">ETH Balance (Robinhood Chain)</div>
                <div className="mono font-bold text-3xl text-emerald-600 dark:text-emerald-400">
                  {ethBalance} ETH
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/[0.04] dark:border-white/[0.06]">
                <div className="text-xs text-neutral-500 mb-1">SPY Balance (Stock Token)</div>
                <div className="mono font-bold text-3xl">
                  {spyBalance} SPY
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
