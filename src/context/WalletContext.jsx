import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const { addToast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('0x71C...a49B');
  const [handle, setHandle] = useState('@you');
  const [ethBalance, setEthBalance] = useState(0.125);
  const [spyBalance, setSpyBalance] = useState(1.45);
  const [holdings, setHoldings] = useState({
    '0x3bfde85d41f0bf1879e3d62701b50f9ee4ad6969': 150000,
  });

  const connectWallet = () => {
    setIsConnected(true);
    addToast('Connected with X as @you (Robinhood Chain Wallet: 0x71C...a49B)', 'success');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    addToast('Wallet disconnected', 'info');
  };

  const buyToken = (token, amountEth) => {
    if (amountEth > ethBalance) {
      addToast('Insufficient ETH balance in aozi wallet', 'error');
      return false;
    }
    setEthBalance(prev => +(prev - amountEth).toFixed(4));
    const tokenAmount = Math.floor(amountEth * 1000000 / (token.progress > 0 ? token.progress : 1));
    setHoldings(prev => ({
      ...prev,
      [token.address]: (prev[token.address] || 0) + tokenAmount
    }));
    addToast(`Bought ${tokenAmount.toLocaleString()} ${token.ticker} for ${amountEth} ETH!`, 'success');
    return true;
  };

  const sellToken = (token, tokenAmount) => {
    const current = holdings[token.address] || 0;
    if (tokenAmount > current) {
      addToast(`Insufficient ${token.ticker} balance`, 'error');
      return false;
    }
    const ethGained = +(tokenAmount * 0.0000008).toFixed(4);
    setEthBalance(prev => +(prev + ethGained).toFixed(4));
    setHoldings(prev => ({
      ...prev,
      [token.address]: prev[token.address] - tokenAmount
    }));
    addToast(`Sold ${tokenAmount.toLocaleString()} ${token.ticker} for ${ethGained} ETH`, 'success');
    return true;
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        handle,
        ethBalance,
        spyBalance,
        holdings,
        connectWallet,
        disconnectWallet,
        buyToken,
        sellToken
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
}
