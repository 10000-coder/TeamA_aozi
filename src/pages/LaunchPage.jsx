import React from 'react';
import { ArrowLeft, XCircle } from 'lucide-react';

export default function LaunchPage({ navigate }) {
  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-12">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to coins</span>
      </button>

      <div className="mb-12">
        <h1 className="serif text-5xl sm:text-7xl font-normal tracking-tight mb-4">
          Tweet a picture. <br/><span className="italic">Get a coin.</span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
          Tag <strong>@aozibot</strong> with launch, a name, a ticker and an image. It builds the coin on Pons from your aozi wallet and replies with the link. The Pons fee is 0.0005 ETH.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="serif text-3xl sm:text-4xl font-normal mb-6">The rules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Image", desc: "Required. No picture, no coin." },
            { label: "Ticker", desc: "2 to 10 letters or numbers, after a $" },
            { label: "Name", desc: "Up to 32 characters" },
            { label: "Limit", desc: "Up to 3 launches per account per day" },
            { label: "Unique", desc: "One live coin per ticker in the house" },
            { label: "Cost", desc: "0.0005 ETH Pons fee taken from aozi wallet" }
          ].map((rule, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/70 dark:bg-[#101212]/70 border border-black/[0.06] dark:border-white/[0.08]">
              <div className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-1">{rule.label}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">{rule.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
