import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TradeModal from './components/TradeModal';
import Home from './pages/Home';
import TokenDetail from './pages/TokenDetail';
import LaunchPage from './pages/LaunchPage';
import FlywheelPage from './pages/FlywheelPage';
import DocsPage from './pages/DocsPage';
import ProfilePage from './pages/ProfilePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.startsWith('/t/')) return path;
    if (['/launch', '/flywheel', '/docs', '/profile', '/terms', '/privacy'].includes(path)) {
      return path;
    }
    return hash || '/';
  });

  const [activeTradeToken, setActiveTradeToken] = useState(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/t/')) {
        setCurrentRoute(path);
      } else if (['/launch', '/flywheel', '/docs', '/profile', '/terms', '/privacy'].includes(path)) {
        setCurrentRoute(path);
      } else {
        setCurrentRoute(hash || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route) => {
    if (route.startsWith('/#')) {
      const targetId = route.replace('/#', '');
      window.history.pushState(null, '', '/' + route.replace('/', ''));
      setCurrentRoute('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    window.history.pushState(null, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrade = (token) => {
    setActiveTradeToken(token);
    setIsTradeModalOpen(true);
  };

  const handleSelectToken = (token) => {
    navigate(`/t/${token.address}`);
  };

  let pageContent = null;
  if (currentRoute.startsWith('/t/')) {
    const address = currentRoute.replace('/t/', '');
    pageContent = (
      <TokenDetail
        address={address}
        onOpenTrade={handleOpenTrade}
        navigate={navigate}
      />
    );
  } else if (currentRoute === '/launch') {
    pageContent = <LaunchPage navigate={navigate} />;
  } else if (currentRoute === '/flywheel') {
    pageContent = <FlywheelPage navigate={navigate} />;
  } else if (currentRoute === '/docs') {
    pageContent = <DocsPage navigate={navigate} />;
  } else if (currentRoute === '/profile') {
    pageContent = <ProfilePage navigate={navigate} onOpenTrade={handleOpenTrade} />;
  } else if (currentRoute === '/terms') {
    pageContent = <TermsPage navigate={navigate} />;
  } else if (currentRoute === '/privacy') {
    pageContent = <PrivacyPage navigate={navigate} />;
  } else {
    pageContent = (
      <Home
        onOpenTrade={handleOpenTrade}
        onSelectToken={handleSelectToken}
        navigate={navigate}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200">
      <Navbar currentRoute={currentRoute} navigate={navigate} />
      
      <main className="flex-1">
        {pageContent}
      </main>

      <Footer navigate={navigate} />

      <TradeModal
        token={activeTradeToken}
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
      />
    </div>
  );
}
