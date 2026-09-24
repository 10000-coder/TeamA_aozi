# TeamA_aozi — aozi.family Frontend Replica

> High-fidelity frontend replication of [aozi.family](https://www.aozi.family/), the agentic meme coin launchpad on Pons v2 atop Robinhood Chain. Built with **React 18**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Overview & Key Features

This project faithfully replicates the user experience, typography, animations, interactions, and design tokens of **aozi.family**:

1. **Brand Aesthetics & Design Tokens**
   - Exact typography using **Instrument Serif** (display/italic headlines), **Geist** (body UI), and **Geist Mono** (tabular numbers, hashes, addresses).
   - High-fidelity **radial gradient lighting effects** across both **Light Mode** (`#f3f7fa`) and **Dark Mode** (`#050606`).
   - Micro-interactions, button depth transitions (`.b1`, `.b2`), glowing pulse indicators, and responsive navigation overlays.

2. **Interactive Tweet Simulator (Hero Section)**
   - Type custom token tickers & names (e.g. `@aozibot launch $FROG Frog Summer`).
   - Realistic bot typing animation and automated responses from `@aozibot`.
   - Dynamic launch card generation with instant buy/trade links.

3. **Launched by aozi (Coins Grid)**
   - Featured **Graduated Coin Card**: `$AOZI` paired with SPY (Uniswap graduation, 4.72 SPY mcap).
   - Dynamic filtering by **Newest**, **Most active**, **Biggest $AOZI**, and **Graduated**.
   - Search filter by token name, ticker, or creator handle.
   - Comprehensive bonding curve progress bars (0 to 4.2 ETH graduation target).

4. **Porch Talk (Social Feed)**
   - Real-time simulated feed of community tweets and automated responses from `@aozibot`.
   - Gold-glowing cards for launched tokens.
   - Live "Listening for mentions" status indicator.
   - Trending hashtags (`#RobinhoodChain`, `$FROG`, `Pons`, `#TokenizedStocks`) & "Who to follow" recommendation widgets.

5. **Token Detail View (`/t/:contractAddress`)**
   - Individual page per coin with price, market cap, holders, and graduation curve metric.
   - Interactive SVG bonding curve price chart with timeframe toggles (`1H`, `24H`, `7D`, `ALL`).
   - Live trade transaction stream (Buy / Sell volume, wallet hashes, timestamps).
   - External links to Robinhood Chain Blockscout explorer.

6. **Flywheel Page (`/flywheel`)**
   - Explains the 1% trade buyback mechanics of the treasury.
   - Real-time treasury reserves readout (`0.0000 SPY`, `0.0002 ETH`).
   - **Interactive Volume Slider**: drag daily volume (1 ETH to 5,000 ETH) to see projected daily, monthly, and yearly buyback yield.

7. **How to Launch Guide (`/launch`)**
   - Method 1: Launch on your own tweet with picture.
   - Method 2: Launch deep in a thread under someone else's post.
   - Launch rules & refusal criteria breakdown (character limits, fees, anti-sybil rules).

8. **Documentation (`/docs`)**
   - Sidebar navigation across Start Here, Theses and Snipes, Scanned by aozi, Pons Weather climate report, and Command Reference.

9. **Robinhood Chain Wallet & Profile (`/profile`)**
   - Connect with X simulation (`@you`).
   - Balance readout for ETH and tokenized SPY.
   - QR deposit modal, private key export security dialog, and token portfolio breakdown.

10. **Interactive Trade Modal**
    - Seamless Buy / Sell tabs for any token.
    - Quick presets (25%, 50%, 75%, 100% or 0.01 / 0.05 / 0.1 ETH).
    - Flywheel 1% fee calculation & slippage tolerance.
    - Live toast notifications mimicking aozi's `.lv-toast` system.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Version Control**: Git & GitHub (`10000-coder/TeamA_aozi`)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/10000-coder/TeamA_aozi.git
cd TeamA_aozi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```
Production assets will be built into the `dist/` directory.

---

## 👥 Bot Team Credits

- **TeamA_main**: Orchestrator, architecture design, repository configuration & deployment.
- **TeamA_fetcher**: Asset research & original site specification.
- **TeamA_dev**: Frontend implementation, components, mock data & routing.
- **TeamA_qa**: Cross-view validation, responsive layout testing & verification.
