import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Footer from './components/Footer';

import Home from './pages/Home';
import Launch from './pages/Launch';
import Flywheel from './pages/Flywheel';
import Docs from './pages/Docs';
import Profile from './pages/Profile';
import TokenDetail from './pages/TokenDetail';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFound from './pages/NotFound';

import TradeModal from './components/TradeModal';
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import ExportKeyModal from './components/ExportKeyModal';

import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { WalletProvider } from './context/WalletContext';

import { Home as HomeIcon, Rocket, Flame, BookOpen, User } from 'lucide-react';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [tradeModalToken, setTradeModalToken] = useState(null);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [exportKeyOpen, setExportKeyOpen] = useState(false);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const navigate = (to) => {
    if (to.startsWith('/#')) {
      const hash = to.replace('/', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (to.startsWith('#')) {
      const el = document.querySelector(to);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectToken = (tok) => {
    if (tok && tok.address) {
      navigate(`/t/${tok.address}`);
    }
  };

  const handleOpenTrade = (tok) => {
    setTradeModalToken(tok);
  };

  let pageComponent = null;
  if (currentPath === '/') {
    pageComponent = (
      <Home
        onOpenTrade={handleOpenTrade}
        onSelectToken={handleSelectToken}
        navigate={navigate}
        searchQuery={searchQuery}
      />
    );
  } else if (currentPath === '/launch') {
    pageComponent = <Launch navigate={navigate} />;
  } else if (currentPath === '/flywheel') {
    pageComponent = <Flywheel navigate={navigate} />;
  } else if (currentPath === '/docs') {
    pageComponent = <Docs />;
  } else if (currentPath === '/profile') {
    pageComponent = (
      <Profile
        onOpenDeposit={() => setDepositOpen(true)}
        onOpenWithdraw={() => setWithdrawOpen(true)}
        onOpenExportKey={() => setExportKeyOpen(true)}
        onOpenTrade={handleOpenTrade}
      />
    );
  } else if (currentPath === '/terms') {
    pageComponent = <TermsPage navigate={navigate} />;
  } else if (currentPath === '/privacy') {
    pageComponent = <PrivacyPage navigate={navigate} />;
  } else if (currentPath.startsWith('/t/')) {
    const address = currentPath.replace('/t/', '').split('?')[0].split('#')[0];
    pageComponent = (
      <TokenDetail
        address={address}
        onBack={() => navigate('/')}
        onOpenTrade={handleOpenTrade}
      />
    );
  } else {
    pageComponent = <NotFound navigate={navigate} />;
  }

  const isHome = currentPath === '/';

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
      <Navbar currentRoute={currentPath} navigate={navigate} />

      <div className="w-full max-w-[1280px] mx-auto flex justify-center flex-1">
        <Sidebar
          currentRoute={currentPath}
          navigate={navigate}
          onOpenNewPost={() => {
            if (currentPath !== '/') navigate('/');
            setTimeout(() => {
              const el = document.getElementById('tweet-composer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />

        <main className={`w-full min-h-screen pb-20 md:pb-0 ${
          isHome 
            ? 'max-w-[620px] lg:max-w-[650px] border-x border-black/[0.08] dark:border-white/[0.08]' 
            : 'flex-1 max-w-[960px] px-3 sm:px-6 py-4'
        }`}>
          {pageComponent}
        </main>

        {isHome && (
          <Widgets
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            navigate={navigate}
          />
        )}
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-black/[0.08] dark:border-white/[0.08] px-2 py-2 flex items-center justify-around">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
            currentPath === '/' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-neutral-500'
          }`}
        >
          <HomeIcon className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate('/launch')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
            currentPath === '/launch' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-neutral-500'
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>Launch</span>
        </button>
        <button
          onClick={() => navigate('/flywheel')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
            currentPath === '/flywheel' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-neutral-500'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Flywheel</span>
        </button>
        <button
          onClick={() => navigate('/docs')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
            currentPath === '/docs' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-neutral-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Docs</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
            currentPath === '/profile' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-neutral-500'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>

      <TradeModal
        token={tradeModalToken}
        isOpen={!!tradeModalToken}
        onClose={() => setTradeModalToken(null)}
      />

      <DepositModal
        isOpen={depositOpen}
        onClose={() => setDepositOpen(false)}
      />

      <WithdrawModal
        isOpen={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
      />

      <ExportKeyModal
        isOpen={exportKeyOpen}
        onClose={() => setExportKeyOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WalletProvider>
          <AppContent />
        </WalletProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
