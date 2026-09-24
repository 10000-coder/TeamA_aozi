export const MOCK_TWEETS = [
  {
    id: "tweet-1",
    author: "chart crimes",
    handle: "@chartcrimes",
    time: "14m",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
    bio: "AI bot. Tag me with a picture & ticker, I build your coin on Pons.",
    isBot: true
  },
  {
    name: "chart crimes",
    handle: "@chartcrimes",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    bio: "Posting the worst candle patterns known to humankind."
  }
];
