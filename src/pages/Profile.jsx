import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Key, Wallet, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { MOCK_TOKENS, GRADUATED_TOKEN } from '../mock/tokens';

export default function Profile({ onOpenDeposit, onOpenWithdraw, onOpenExportKey, onOpenTrade }) {
  const { isConnected, handle, address, ethBalance, spyBalance, holdings, connectWallet, disconnectWallet } = useWallet();

  const allTokens = [GRADUATED_TOKEN, ...MOCK_TOKENS];
  const userHeldTokens = allTokens.filter(t => (holdings[t.address] || 0) > 0);

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-12 md:py-20 animate-fade-in">
      <div className="max-w-2xl mb-12">
        <h1 className="serif text-5xl sm:text-6xl font-normal tracking-tight mb-4">
          Your <span className="italic">aozi</span> wallet
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Sign in with X and aozi makes you a wallet on Robinhood Chain, tied to your X account. Deposit, buy from a reply or right here, and take your money out whenever you want.
        </p>
      </div>

      {!isConnected ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6">
            <Wallet className="w-8 h-8" />
          </div>
          <h2 className="serif text-3xl sm:text-4xl font-normal mb-3">
            Connect with X to get started
          </h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-8">
            Your wallet is provisioned automatically with instant gas-free setup on Robinhood Chain.
          </p>
          <button
            onClick={connectWallet}
            className="b b1 px-8 py-3.5 text-base font-bold shadow-lg"
          >
            <span>Sign in with X</span>
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  YOU
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{handle}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                      Robinhood Chain
                    </span>
                  </div>
                  <div className="mono text-xs text-neutral-400 mt-0.5">
                    {address}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={onOpenDeposit}
                  className="b b1 text-xs px-4 py-2.5 font-bold flex items-center gap-1.5"
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>Deposit</span>
                </button>
                <button
                  onClick={onOpenWithdraw}
                  className="b b2 text-xs px-4 py-2.5 font-bold flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Withdraw</span>
                </button>
                <button
                  onClick={onOpenExportKey}
                  className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  title="Export Private Key"
                >
                  <Key className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 block mb-1">ETH Balance</span>
                <span className="serif text-3xl font-normal text-emerald-600 dark:text-emerald-400">
                  {ethBalance} ETH
                </span>
                <span className="text-[11px] text-neutral-400 block mt-1">Available for coin launches & trading</span>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60">
                <span className="text-xs text-neutral-500 block mb-1">SPY Balance</span>
                <span className="serif text-3xl font-normal text-neutral-800 dark:text-neutral-100">
                  {spyBalance} SPY
                </span>
                <span className="text-[11px] text-neutral-400 block mt-1">Tokenized SPY stock currency</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#101212]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1]">
            <h3 className="serif text-2xl font-normal mb-4">Your Coin Holdings</h3>

            {userHeldTokens.length > 0 ? (
              <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                {userHeldTokens.map(tok => {
                  const balance = holdings[tok.address] || 0;
                  return (
                    <div key={tok.address} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={tok.image}
                          alt={tok.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-sm flex items-center gap-1.5">
                            <span>{tok.name}</span>
                            <span className="mono text-xs px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 font-semibold">
                              {tok.ticker}
                            </span>
                          </div>
                          <div className="mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                            {balance.toLocaleString()} {tok.ticker}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenTrade?.(tok)}
                          className="b b2 text-xs px-3.5 py-1.5 font-bold"
                        >
                          Trade
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500 text-xs">
                You don't hold any coins yet. Discover tokens on the homepage or tag @aozibot on X to launch your own!
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#101212]/60 border border-black/[0.04] dark:border-white/[0.06]">
              <h4 className="font-bold text-sm mb-1.5">Deposit with a QR</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Scan it or copy the address. ETH or tokenized stocks on Robinhood Chain.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#101212]/60 border border-black/[0.04] dark:border-white/[0.06]">
              <h4 className="font-bold text-sm mb-1.5">Buy from a reply</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Tell aozi to buy on X, or tap Buy on any coin here. It spends your balance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#101212]/60 border border-black/[0.04] dark:border-white/[0.06]">
              <h4 className="font-bold text-sm mb-1.5">Leave any time</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Withdraw to any address or export your private key. It's your money.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
