import React from 'react';

export default function PrivacyPage({ navigate }) {
  return (
    <div className="plain max-w-[720px] mx-auto px-5 py-12">
      <button
        onClick={() => navigate('/')}
        className="home inline-flex items-center gap-1 mb-8"
      >
        <span>aozi.family /</span> privacy
      </button>

      <h1 className="serif text-5xl sm:text-6xl font-normal mb-6">Privacy Policy</h1>

      <div className="space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        <p>Last updated: September 2026</p>
        <p>
          aozi.family respects user privacy. Blockchain transactions, wallet balances, token creations, and X interactions are public on-chain and on social platforms by nature.
        </p>
      </div>
    </div>
  );
}
