export const DOCS_SECTIONS = [
  {
    id: "start-here",
    title: "Start here",
    summary: "aozi is an AI bot on X, @aozibot, with a home at aozi.family. Tag it and it talks back. Tag it with a picture, a name and a ticker, and it launches that coin on Pons, the memecoin launchpad on Robinhood Chain, then replies with the link.",
    steps: [
      { step: "1", title: "Tag it on X", text: "Post a picture with @aozibot launch $TICKER Name, or reply @aozibot launch this under a post that has one." },
      { step: "2", title: "Fund your wallet", text: "The first time you tag aozi, it makes you a wallet. Add about 0.0011 ETH on Robinhood Chain to cover the launch." },
      { step: "3", title: "It launches", text: "aozi launches the coin from your wallet and replies with its page. You're the creator, so the creator fees are yours." }
    ]
  },
  {
    id: "theses-and-snipes",
    title: "Theses and snipes",
    summary: "Two more things aozi does on X: it reads a coin and tells you whether it's a buy, and it buys the coins an account launches or calls, the moment they do.",
    items: [
      {
        name: "Ask for a thesis",
        desc: "Tag @aozibot under a coin's post, or with its $TICKER, contract address or chart link, on any chain. Just the tag works, and so do 'thesis', 'wdyt', 'should i buy this?' and '能买吗'.",
        details: "Market cap, liquidity, 24h volume and change, buyers, age, and graduation progress for coins still on the Pons curve."
      },
      {
        name: "Snipe an account",
        desc: "@aozibot snipe @handle 0.01 buys 0.01 ETH of every coin that account launches or calls, straight from your aozi wallet.",
        details: "It keeps watching until you cancel, and buys each new coin once, up to 1 ETH a buy."
      }
    ]
  },
  {
    id: "scanned-by-aozi",
    title: "Scanned by aozi",
    summary: "Pons takes about eleven thousand launches a day, so the useful question is never what a coin is, it is which of the eleven thousand this one is. Ask aozi and it reads the chain and stamps a card: green means buy it, red means don't."
  },
  {
    id: "pons-weather",
    title: "The Pons weather",
    summary: "Pons takes around fourteen thousand launches a day and about one in a hundred gets out of the curve. aozi reports the weather every six hours."
  },
  {
    id: "command-reference",
    title: "Command reference",
    summary: "Quick syntax to interact with @aozibot on X:"
  }
];
