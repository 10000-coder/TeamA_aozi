import React from 'react';
import Hero from '../components/Hero';
import TokenList from '../components/TokenList';
import PorchTalk from '../components/PorchTalk';

export default function Home({ onOpenTrade, onSelectToken, navigate }) {
  return (
    <div className="space-y-4">
      <Hero
        onOpenTrade={onOpenTrade}
        onSelectToken={onSelectToken}
      />
      <TokenList
        onOpenTrade={onOpenTrade}
        onSelectToken={onSelectToken}
      />
      <PorchTalk
        onOpenTrade={onOpenTrade}
        onSelectToken={onSelectToken}
      />
    </div>
  );
}
