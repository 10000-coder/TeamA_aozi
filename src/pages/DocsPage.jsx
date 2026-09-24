import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DOCS_SECTIONS } from '../mock/docs';

export default function DocsPage({ navigate }) {
  const [activeSection, setActiveSection] = useState('start-here');

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to coins</span>
      </button>

      <div className="mb-12">
        <h1 className="serif text-5xl sm:text-6xl font-normal tracking-tight mb-4">
          How <span className="italic">aozi</span> works
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
          Everything the house does, in plain words, and the maths underneath: launching a coin from X, theses and snipes, the wallet that comes with it, the curve, graduation, what it costs, and how it all stays safe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1 sticky top-24 self-start">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 px-3">
            On this page
          </div>
          {DOCS_SECTIONS.map(sec => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeSection === sec.id
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-16">
          <section id="start-here" className="scroll-mt-24 space-y-6">
            <h2 className="serif text-3xl font-normal">Start here</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              aozi is an AI bot on X, @aozibot, with a home at aozi.family. Tag it and it talks back. Tag it with a picture, a name and a ticker, and it launches that coin on Pons, the memecoin launchpad on Robinhood Chain, then replies with the link.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#101212]/80 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="mono text-emerald-600 dark:text-emerald-400 font-bold mb-2">1. Tag it on X</div>
                <p className="text-xs text-neutral-500">Post a picture with @aozibot launch $TICKER Name, or reply @aozibot launch this.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#101212]/80 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="mono text-emerald-600 dark:text-emerald-400 font-bold mb-2">2. Fund your wallet</div>
                <p className="text-xs text-neutral-500">The first time you tag aozi, it makes you a wallet on Robinhood Chain.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#101212]/80 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="mono text-emerald-600 dark:text-emerald-400 font-bold mb-2">3. It launches</div>
                <p className="text-xs text-neutral-500">aozi launches coin from your wallet and replies with its page. Creator fees are yours.</p>
              </div>
            </div>
          </section>

          <section id="theses-and-snipes" className="scroll-mt-24 space-y-6">
            <h2 className="serif text-3xl font-normal">Theses and snipes</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Two more things aozi does on X: it reads a coin and tells you whether it's a buy, and it buys the coins an account launches or calls, the moment they do.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
