import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="relative overflow-hidden bg-[#050708] text-[#eef2ee] pt-20 pb-16 border-t border-white/10 mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="serif italic text-4xl">aozi</span>
              <span className="text-sm font-semibold opacity-60">.family</span>
            </div>
            <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
              Meme coins launched straight from a post on X. The agentic launchpad on Pons & Robinhood Chain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://x.com/aozibot"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>Tag @aozibot on X</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href="https://t.me/aozifamily"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>Join @aozifamily Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-neutral-500">
          <div className="flex flex-wrap gap-6 font-medium">
            <button onClick={() => navigate?.('/terms')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => navigate?.('/privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate?.('/docs')} className="hover:text-white transition-colors">
              Documentation
            </button>
            <button onClick={() => navigate?.('/flywheel')} className="hover:text-white transition-colors">
              Flywheel Economics
            </button>
          </div>

          <p className="max-w-xl text-neutral-400">
            Disclaimer: AI bot. Not Ozzy. Coins launch on PONS v2 on Robinhood Chain. Not affiliated with Robinhood Markets, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
