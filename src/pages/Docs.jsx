import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, BookOpen, Terminal, ShieldAlert, CloudSun, Compass, HelpCircle } from 'lucide-react';
import { DOCS_SECTIONS } from '../mock/docs';
import { useToast } from '../context/ToastContext';

export default function Docs() {
  const { addToast } = useToast();
  const [activeSection, setActiveSection] = useState('start-here');
  const [copiedCmd, setCopiedCmd] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedCmd(text);
    addToast(`Copied "${text}"`, 'success');
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 md:py-20 animate-fade-in">
      
      {/* Title */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
          <span>Documentation</span>
        </div>
        <h1 className="serif text-5xl sm:text-6xl font-normal tracking-tight mb-4">
          How <span className="italic">aozi</span> works
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Everything the house does, in plain words, and the maths underneath: launching a coin from X, theses and snipes, the wallet that comes with it, the curve, graduation, what it costs, and how it all stays safe.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 bg-white/70 dark:bg-[#101212]/70 backdrop-blur-md p-4 rounded-3xl border border-black/[0.06] dark:border-white/[0.08]">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3 px-3">
            On this page
          </span>
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {[
              { id: 'start-here', label: 'Start here' },
              { id: 'theses-and-snipes', label: 'Theses & snipes' },
              { id: 'scanned-by-aozi', label: 'Scanned by aozi' },
              { id: 'pons-weather', label: 'The Pons weather' },
              { id: 'command-reference', label: 'Command reference' },
              { id: 'contracts', label: 'Contracts & chain' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 space-y-16">
          
          {/* Section: Start Here */}
          <section id="start-here" className="scroll-mt-24">
            <h2 className="serif text-3xl sm:text-4xl font-normal mb-4">Start here</h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              aozi is an AI bot on X, <strong className="text-black dark:text-white">@aozibot</strong>, with a home at aozi.family. Tag it and it talks back. Tag it with a picture, a name and a ticker, and it launches that coin on Pons, the memecoin launchpad on Robinhood Chain, then replies with the link.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#101212]/80 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-xs mb-3">
                  1
                </div>
                <h3 className="font-bold text-sm mb-1">Tag it on X</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Post a picture with <code className="text-emerald-600 dark:text-emerald-400 font-semibold">@aozibot launch $TICKER Name</code>, or reply <code className="text-emerald-600 dark:text-emerald-400 font-semibold">@aozibot launch this</code> under a post.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#101212]/80 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-xs mb-3">
                  2
                </div>
                <h3 className="font-bold text-sm mb-1">Fund your wallet</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  The first time you tag aozi, it makes you a wallet. Add about 0.0011 ETH on Robinhood Chain to cover the launch fee & gas.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#101212]/80 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-xs mb-3">
                  3
                </div>
                <h3 className="font-bold text-sm mb-1">It launches</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  aozi launches the coin from your wallet and replies with its page. You're the creator, so the creator fees are yours.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-neutral-500">
                Live channels: <strong className="text-black dark:text-white">@aozibot</strong> on X · Community on Telegram <strong className="text-black dark:text-white">@aozifamily</strong>
              </span>
              <a
                href="https://x.com/aozibot"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Follow @aozibot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* Section: Theses and Snipes */}
          <section id="theses-and-snipes" className="scroll-mt-24 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
            <h2 className="serif text-3xl sm:text-4xl font-normal mb-4">Theses and snipes</h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              Two more things aozi does on X: it reads a coin and tells you whether it's a buy, and it buys the coins an account launches or calls, the moment they do.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/80 dark:bg-[#101212]/80 rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08]">
                <h3 className="font-bold text-base mb-2">Ask for a thesis</h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  Tag <code className="font-semibold text-emerald-600">@aozibot</code> under a coin's post, or with its $TICKER, contract address or chart link. Works with <code className="mono">thesis</code>, <code className="mono">wdyt</code>, <code className="mono">should i buy this?</code> and <code className="mono">能买吗</code>.
                </p>
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-xs space-y-1">
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">The verdict:</div>
                  <div className="text-neutral-500">Buy, small bag, wait or pass, with one line of why in aozi's voice, weighing on-chain liquidity against social sentiment.</div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-[#101212]/80 rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08]">
                <h3 className="font-bold text-base mb-2">Snipe an account</h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  <code className="mono font-semibold text-emerald-600">@aozibot snipe @handle 0.01</code> buys 0.01 ETH of every coin that account launches or calls, straight from your aozi wallet.
                </p>
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-xs space-y-1">
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">Execution safeguard:</div>
                  <div className="text-neutral-500">Snipes never buy inside Pons's 3-second launch tax window. aozi waits it out, then buys safely.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Scanned by aozi */}
          <section id="scanned-by-aozi" className="scroll-mt-24 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
            <h2 className="serif text-3xl sm:text-4xl font-normal mb-4">Scanned by aozi</h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              Pons takes about eleven thousand launches a day, so the useful question is never what a coin is, it is which of the eleven thousand this one is. Ask aozi and it reads the chain and stamps a card: green means buy it, red means don't.
            </p>

            <div className="bg-white/80 dark:bg-[#101212]/80 rounded-3xl p-6 sm:p-8 border border-black/[0.06] dark:border-white/[0.08]">
              <h3 className="font-bold text-sm text-neutral-400 uppercase tracking-wider mb-4">What it reads on the curve</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]">
                  <strong className="block text-neutral-800 dark:text-neutral-200 mb-0.5">Creator's own bag:</strong>
                  <span className="text-neutral-500">What the launching wallet still holds. A creator holding nothing cannot dump on you.</span>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]">
                  <strong className="block text-neutral-800 dark:text-neutral-200 mb-0.5">Creator tax:</strong>
                  <span className="text-neutral-500">Pons allows up to 10% tax on trades. Coins with high tax are flagged red immediately.</span>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]">
                  <strong className="block text-neutral-800 dark:text-neutral-200 mb-0.5">Top-holder spread:</strong>
                  <span className="text-neutral-500">How much of the total supply is held by the top ten non-bonding addresses.</span>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03]">
                  <strong className="block text-neutral-800 dark:text-neutral-200 mb-0.5">Liquidity lock:</strong>
                  <span className="text-neutral-500">Whether graduated LP is burned or permanently locked in the Uniswap V3 pool.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Command Reference */}
          <section id="command-reference" className="scroll-mt-24 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
            <h2 className="serif text-3xl sm:text-4xl font-normal mb-4">Command reference</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Every command you can tweet at <code className="text-emerald-600 font-semibold">@aozibot</code> on X:
            </p>

            <div className="space-y-3 font-mono text-xs">
              {[
                { cmd: '@aozibot launch $TICKER Name', desc: 'Launch a new coin on Pons with an image attachment' },
                { cmd: '@aozibot launch this', desc: 'Reply to any image tweet to launch it as a token' },
                { cmd: '@aozibot buy 0.05 $AOZI', desc: 'Instantly buy 0.05 ETH worth of $AOZI from wallet' },
                { cmd: '@aozibot sell 50% $AOZI', desc: 'Sell 50% of your holdings back to the bonding curve' },
                { cmd: '@aozibot thesis $FROG', desc: 'Get AI fundamental analysis and sentiment rating' },
                { cmd: '@aozibot snipe @handle 0.01', desc: 'Auto-buy 0.01 ETH whenever @handle creates/shills a token' },
                { cmd: '@aozibot balance', desc: 'Direct message wallet balance and open positions' },
              ].map((c, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08] gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Terminal className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold truncate">{c.cmd}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 text-neutral-500 font-sans text-xs">
                    <span>{c.desc}</span>
                    <button
                      onClick={() => handleCopy(c.cmd)}
                      className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 shrink-0"
                    >
                      {copiedCmd === c.cmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Contracts & Chain */}
          <section id="contracts" className="scroll-mt-24 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
            <h2 className="serif text-3xl sm:text-4xl font-normal mb-4">Contracts & chain info</h2>
            <div className="p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-neutral-500 font-sans">Network</span>
                <span className="font-bold">Robinhood Chain (L2)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-neutral-500 font-sans">Pons Factory</span>
                <span className="text-emerald-600 dark:text-emerald-400">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-neutral-500 font-sans">Bonding Curve Target</span>
                <span>4.20 ETH</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-500 font-sans">Graduation Pair</span>
                <span className="text-amber-500 font-bold">SPY (Tokenized S&P 500)</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
