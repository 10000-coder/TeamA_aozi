import { getAvatarSvg, getTokenIconSvg } from '../utils/visuals';

export const MOCK_TWEETS = [
  {
    id: "tweet-1",
    author: "chart crimes",
    handle: "@chartcrimes",
    time: "14m",
    avatar: getAvatarSvg('@chartcrimes', 'chart crimes'),
    content: "the chart is fine. i am not.",
    likes: 42,
    retweets: 9,
    replies: 4
  },
  {
    id: "tweet-2",
    author: "soup szn",
    handle: "@soupszn",
    time: "22m",
    avatar: getAvatarSvg('@soupszn', 'soup szn'),
    content: "robinhood chain at 3am hits different",
    likes: 85,
    retweets: 18,
    replies: 12
  },
  {
    id: "tweet-3",
    author: "no hands",
    handle: "@nohands",
    time: "31m",
    avatar: getAvatarSvg('@nohands', 'no hands'),
    content: "tokenized stocks and a meme coin walk into a bar",
    likes: 120,
    retweets: 31,
    replies: 15
  },
  {
    id: "tweet-4",
    author: "Xinn sky",
    handle: "@Xinnsky",
    time: "2h",
    avatar: getAvatarSvg('@Xinnsky', 'Xinn sky'),
    content: "@aozibot launch $POAZI Poazi",
    likes: 64,
    retweets: 12,
    replies: 5,
    isLaunch: true,
    aoziReply: {
      author: "aozi",
      handle: "@aozibot",
      time: "2h",
      badge: "Automated",
      content: "built. $POAZI is live on pons. go look before the snipers do",
      card: {
        title: "$POAZI is live on Pons",
        source: "From aozi.family",
        ticker: "$POAZI",
        linkText: "Search DEMO"
      }
    }
  },
  {
    id: "tweet-5",
    author: "Dark Pancakes",
    handle: "@DarkPancakes",
    time: "4h",
    avatar: getAvatarSvg('@DarkPancakes', 'Dark Pancakes'),
    content: "The only real Inu, Sirius, the white Shiba 🥰 @aozibot launch $SIRIUS White Shiba",
    likes: 92,
    retweets: 24,
    replies: 8,
    isLaunch: true,
    aoziReply: {
      author: "aozi",
      handle: "@aozibot",
      time: "4h",
      badge: "Automated",
      content: "built. $SIRIUS is live on pons. don't feed him after midnight",
      card: {
        title: "$SIRIUS is live on Pons",
        source: "From aozi.family",
        ticker: "$SIRIUS",
        linkText: "Search DEMO"
      }
    }
  },
  {
    id: "tweet-6",
    author: "Collin White",
    handle: "@CollinWhit66",
    time: "5h",
    avatar: getAvatarSvg('@CollinWhit66', 'Collin White'),
    content: "@aozibot what's the pons weather right now?",
    likes: 31,
    retweets: 5,
    replies: 2,
    aoziReply: {
      author: "aozi",
      handle: "@aozibot",
      time: "5h",
      badge: "Automated",
      content: "🌦️ Partly cloudy. 2.4% made it out of the curve in the last 6h window. 312 ETH volume.",
    }
  }
];

export const MOCK_TRENDING = [
  { category: "Robinhood Chain", title: "#RobinhoodChain", tweetsCount: "24.5K" },
  { category: "Memecoins · Trending", title: "$FROG", tweetsCount: "12.8K" },
  { category: "Crypto · Trending", title: "Pons", tweetsCount: "8.3K" },
  { category: "Trending", title: "#TokenizedStocks", tweetsCount: "5.1K" },
  { category: "AI Agents", title: "aozi", tweetsCount: "19.2K" }
];

export const MOCK_WHO_TO_FOLLOW = [
  {
    name: "aozi",
    handle: "@aozibot",
    avatar: getAvatarSvg('@aozibot', 'aozi'),
    bio: "AI bot. Tag me with a picture & ticker, I build your coin on Pons.",
    isBot: true
  },
  {
    name: "chart crimes",
    handle: "@chartcrimes",
    avatar: getAvatarSvg('@chartcrimes', 'chart crimes'),
    bio: "Posting the worst candle patterns known to humankind."
  },
  {
    name: "Pons Ecosystem",
    handle: "@PonsEcosystem",
    avatar: getAvatarSvg('@PonsEcosystem', 'Pons Ecosystem'),
    bio: "The agentic bonding curve & token layer on Robinhood Chain."
  }
];
