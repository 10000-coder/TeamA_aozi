import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound({ navigate }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-6">
        <span className="font-serif italic text-3xl font-bold text-emerald-500">404</span>
      </div>
      <h1 className="serif text-4xl sm:text-5xl font-normal mb-3">Page not found</h1>
      <p className="text-neutral-500 max-w-md mb-8 text-sm">
        The link you followed might be broken, or the page may have been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="b b1 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>
    </div>
  );
}
