import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Smile, 
  BarChart2, 
  Calendar, 
  MapPin, 
  Heart, 
  Repeat2, 
  MessageCircle, 
  Share, 
  ArrowUpRight, 
  CheckCircle2, 
  Flame,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import GraduatedBanner from '../components/GraduatedBanner';
import CoinCard from '../components/CoinCard';
import { GRADUATED_TOKEN, MOCK_TOKENS } from '../mock/tokens';
import { useToast } from '../context/ToastContext';
import { getAvatarSvg, getTokenIconSvg } from '../utils/visuals';

export default function Home({ onOpenTrade, onSelectToken, navigate, searchQuery }) {
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('forYou');

  const [composerText, setComposerText] = useState('@aozibot launch $FROG Frog Summer');
  const [isTyping, setIsTyping] = useState(false);
  const [threadItem, setThreadItem] = useState({
    userText: '@aozibot launch $FROG Frog Summer',
    userTime: 'now',
    botReply: 'built. $FROG is live on pons. go look before the snipers do',
    botTime: '4s',
    ticker: 'FROG',
    name: 'Frog Summer'
  });

  const [tokenFilter, setTokenFilter] = useState('all');
  const [internalSearch, setInternalSearch] = useState('');

  const [initialTweets, setInitialTweets] = useState([
    {
      id: 't-crimes',
      author: 'chart crimes',
      handle: '@chartcrimes',
      time: '14m',
      avatar: getAvatarSvg('@chartcrimes', 'chart crimes'),
      content: 'the chart is fine. i am not.',
      replies: 4,
      retweets: 9,
      likes: 42
    },
    {
      id: 't-soup',
      author: 'soup szn',
      handle: '@soupszn',
      time: '22m',
      avatar: getAvatarSvg('@soupszn', 'soup szn'),
      content: 'robinhood chain at 3am hits different',
      replies: 12,
      retweets: 18,
      likes: 85
    },
    {
      id: 't-hands',
      author: 'no hands',
      handle: '@nohands',
      time: '31m',
      avatar: getAvatarSvg('@nohands', 'no hands'),
      content: 'tokenized stocks and a meme coin walk into a bar',
      replies: 15,
      retweets: 31,
      likes: 120
    }
  ]);

  const [tweetLikes, setTweetLikes] = useState({});
  const toggleTweetLike = (id) => {
    setTweetLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePostTweet = (e) => {
    e?.preventDefault();
    if (!composerText.trim()) return;

    const tickerMatch = composerText.match(/\$([a-zA-Z0-9_]+)/);
    const parsedTicker = tickerMatch ? tickerMatch[1].toUpperCase() : 'COIN';
    const parsedName = composerText.replace(/@\w+/g, '').replace(/\$\w+/g, '').trim() || `${parsedTicker} Token`;

    setIsTyping(true);
    addToast('Broadcasting tweet to @aozibot...', 'info');

    setTimeout(() => {
      setIsTyping(false);
      setThreadItem({
        userText: composerText,
        userTime: 'just now',
        botReply: `built. $${parsedTicker} is live on pons. go look before the snipers do`,
        botTime: '2s',
        ticker: parsedTicker,
        name: parsedName
      });
      addToast(`$${parsedTicker} contract generated on Pons!`, 'success');
    }, 1400);
  };

  const effectiveSearch = searchQuery !== undefined ? searchQuery : internalSearch;

  const filteredCoins = useMemo(() => {
    return MOCK_TOKENS.filter((coin) => {
      if (effectiveSearch) {
        const q = effectiveSearch.toLowerCase().replace('$', '');
        const matchName = coin.name.toLowerCase().includes(q);
        const matchTicker = coin.ticker.toLowerCase().includes(q);
        const matchCreator = coin.creator.toLowerCase().includes(q);
        if (!matchName && !matchTicker && !matchCreator) return false;
      }

      if (tokenFilter === 'graduated') return coin.graduated;
      if (tokenFilter === 'active') return !coin.graduated && coin.progress > 0;
      if (tokenFilter === 'biggest') return coin.holders > 100;
      return true;
    });
  }, [tokenFilter, effectiveSearch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-[#050606]/85 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div className="flex items-center justify-around font-bold text-sm">
          <button
            onClick={() => setActiveTab('forYou')}
            className="flex-1 py-3.5 text-center relative hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className={activeTab === 'forYou' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 font-medium'}>
              For you
            </span>
            {activeTab === 'forYou' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-500 rounded-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab('following')}
            className="flex-1 py-3.5 text-center relative hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className={activeTab === 'following' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 font-medium'}>
              Following
            </span>
            {activeTab === 'following' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-500 rounded-full"></div>
            )}
          </button>
        </div>
      </div>

      <div className="divide-y divide-black/[0.06] dark:border-white/[0.08]">
        {initialTweets.map((t) => (
          <div key={t.id} className="p-4 sm:p-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex items-start gap-3">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-10 h-10 rounded-full object-cover border border-black/5 dark:border-white/10 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-bold truncate">{t.author}</span>
                  <span className="text-neutral-500 truncate">{t.handle}</span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-500">{t.time}</span>
                </div>
                <p className="mt-1 text-[15px] text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                  {t.content}
                </p>

                <div className="flex items-center justify-between max-w-sm mt-3 text-neutral-500 text-xs">
                  <button className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.replies}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span>{t.retweets}</span>
                  </button>
                  <button 
                    onClick={() => toggleTweetLike(t.id)} 
                    className={`flex items-center gap-1.5 transition-colors ${
                      tweetLikes[t.id] ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${tweetLikes[t.id] ? 'fill-current' : ''}`} />
                    <span>{t.likes + (tweetLikes[t.id] ? 1 : 0)}</span>
                  </button>
                  <button className="hover:text-emerald-500 transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="tweet-composer" className="p-4 sm:p-5 border-y border-black/[0.08] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.02]">
        <div className="flex items-start gap-3">
          <img
            src={getAvatarSvg('@you', 'You')}
            alt="You"
            className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <textarea
              rows={2}
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder="What's happening? @aozibot launch $TICKER Name"
              className="w-full bg-transparent resize-none text-[16px] placeholder:text-neutral-500 focus:outline-none leading-relaxed"
            />

            <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06] mt-2">
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                <button type="button" className="p-1.5 rounded-full hover:bg-emerald-500/10 transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 rounded-full hover:bg-emerald-500/10 transition-colors">
                  <BarChart2 className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 rounded-full hover:bg-emerald-500/10 transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 rounded-full hover:bg-emerald-500/10 transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 rounded-full hover:bg-emerald-500/10 transition-colors">
                  <MapPin className="w-4 h-4 opacity-50" />
                </button>
              </div>

              <button
                type="button"
                onClick={handlePostTweet}
                disabled={isTyping || !composerText.trim()}
                className="b b1 px-5 py-2 text-sm font-bold rounded-full disabled:opacity-50"
              >
                <span>{isTyping ? 'Launching...' : 'Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 border-b border-black/[0.08] dark:border-white/[0.08] bg-emerald-500/[0.03]">
        <div className="flex items-start gap-3">
          <img
            src={getAvatarSvg('@you', 'You')}
            alt="You"
            className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-bold">you</span>
              <span className="text-neutral-500">@you</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500">{threadItem.userTime}</span>
            </div>
            <p className="mt-1 text-[15px] font-medium leading-relaxed font-sans">
              {threadItem.userText}
            </p>
          </div>
        </div>

        <div className="ml-5 pl-5 border-l-2 border-emerald-500/30 mt-3 pt-3 flex items-start gap-3">
          <img
            src={getAvatarSvg('@aozibot', 'aozi')}
            alt="aozi"
            className="w-9 h-9 rounded-full border border-emerald-500/30 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm mb-1">
              <span className="font-bold">aozi</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-wider">
                Automated
              </span>
              <span className="text-neutral-500 text-xs">@aozibot · {threadItem.botTime}</span>
            </div>

            {isTyping ? (
              <div className="flex items-center gap-2 text-neutral-500 text-sm py-2">
                <span className="inline-flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                </span>
                <span className="italic text-xs">aozi is typing on Robinhood Chain...</span>
              </div>
            ) : (
              <div>
                <p className="text-[14px] text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans mb-3">
                  {threadItem.botReply}
                </p>

                <div 
                  onClick={() => onOpenTrade && onOpenTrade({
                    address: "0xsimulated_live",
                    name: threadItem.name,
                    ticker: `$${threadItem.ticker}`,
                    progress: 1,
                    currency: "ETH"
                  })}
                  className="rounded-2xl p-3.5 bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getTokenIconSvg(threadItem.ticker, threadItem.name)}
                      alt={threadItem.name}
                      className="w-11 h-11 rounded-xl flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                        <span>{threadItem.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                          ${threadItem.ticker}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Pons Bonding Curve · Just launched
                      </div>
                    </div>
                  </div>

                  <span className="b b2 text-xs px-3.5 py-1.5 font-bold">
                    Trade
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="tokens" className="p-4 sm:p-6 scroll-mt-14">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="serif text-2xl sm:text-3xl font-normal tracking-tight">
                Launched by <span className="italic">aozi</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Every coin on the bonding curve was born from a tweet to @aozibot
              </p>
            </div>

            <div className="relative sm:hidden">
              <input
                type="text"
                value={internalSearch}
                onChange={(e) => setInternalSearch(e.target.value)}
                placeholder="Search..."
                className="w-28 text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5 focus:outline-none focus:w-36 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {[
              { id: 'all', label: 'All Coins' },
              { id: 'graduated', label: 'Graduated' },
              { id: 'active', label: 'Active Curve' },
              { id: 'biggest', label: 'Biggest' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTokenFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors ${
                  tokenFilter === tab.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <GraduatedBanner
          onTrade={onOpenTrade}
          onClick={onSelectToken}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredCoins.map((coin) => (
            <CoinCard
              key={coin.address}
              token={coin}
              onTrade={onOpenTrade}
              onClick={onSelectToken}
            />
          ))}
        </div>

        {filteredCoins.length === 0 && (
          <div className="text-center py-16 text-neutral-500 text-sm">
            No coins found matching "{effectiveSearch}".
          </div>
        )}
      </div>

    </div>
  );
}
