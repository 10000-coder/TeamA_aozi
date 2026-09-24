import React, { useState, useMemo } from 'react';
import { Search, Sparkles, TrendingUp, Flame, Check } from 'lucide-react';
import CoinCard from './CoinCard';
import GraduatedBanner from './GraduatedBanner';
import { MOCK_TOKENS, GRADUATED_TOKEN } from '../mock/tokens';

export default function TokenList({ onOpenTrade, onSelectToken }) {
  const [filter, setFilter] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = useMemo(() => {
    let list = [...MOCK_TOKENS];
    if (filter === 'graduated') return [GRADUATED_TOKEN];
    if (filter === 'active') list.sort((a, b) => (b.activeTrades || 0) - (a.activeTrades || 0));
    if (filter === 'biggest') list.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.ticker.toLowerCase().includes(q));
    }
    return list;
  }, [filter, searchQuery]);

  return (
    <section id="coins" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="serif text-4xl sm:text-5xl font-normal tracking-tight mb-2">
            Launched by <span className="italic">aozi</span>
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base">
            Straight from a post on X. Nothing else gets on this list.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, ticker, creator..."
            className="w-full bg-white/70 dark:bg-[#101212]/70 backdrop-blur-md rounded-2xl pl-10 pr-4 py-2.5 text-sm border border-black/[0.08] dark:border-white/[0.08] outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTokens.map(token => (
          <CoinCard
            key={token.address}
            token={token}
            onTrade={onOpenTrade}
            onClick={onSelectToken}
          />
        ))}
      </div>
    </section>
  );
}
