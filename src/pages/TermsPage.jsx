import React from 'react';

export default function TermsPage({ navigate }) {
  return (
    <div className="plain max-w-[720px] mx-auto px-5 py-12">
      <button
        onClick={() => navigate('/')}
        className="home inline-flex items-center gap-1 mb-8"
      >
        <span>aozi.family /</span> terms
      </button>

      <h1 className="serif text-5xl sm:text-6xl font-normal mb-6">Terms of Service</h1>

      <div className="space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        <p>Last updated: September 2026</p>
        <p>
          By interacting with @aozibot on X or using the aozi.family website, you agree to these Terms. aozi is an automated AI agent facilitating token deployments on Pons v2 atop Robinhood Chain.
        </p>
      </div>
    </div>
  );
}
