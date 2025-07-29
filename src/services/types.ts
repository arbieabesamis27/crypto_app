export type SimplifiedProps = {
  simplified: boolean;
};

export interface CoinProps extends SimplifiedProps {
  data?: CoinsResponse;
  error?: any;
  isFetching?: any;
}

export type CoinsResponse = {
  status: string;
  data: {
    stats: GlobalStats;
    coins: Coins[];
  };
};

export type GlobalStats = {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
};

export type Coins = {
  uuid: string;
  symbol: string;
  name: string;
  color: string | null;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  sparkline: (string | null)[];
  lowVolume?: boolean;
  coinrankingUrl: string;
  "24hVolume": string;
  btcPrice: string;
  contractAddresses?: string[];
  isWrappedTrustless?: boolean;
  wrappedTo?: string | null;
};

export type NewsResponse = {
  status: string;
  items: NewsItem[];
};

export type NewsItem = {
  timestamp: string;
  title: string;
  snippet: string;
  images: {
    thumbnail: string | null;
    thumbnailProxied?: string;
  };
  newsUrl: string;
  publisher: string;
};

export type CryptoDetails = {
  status: string;
  data: {
    coin: Coin;
  };
};

export type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: {
    name: string;
    url: string;
    type: string;
  }[];
  supply: {
    confirmed: boolean;
    supplyAt: number;
    max: string;
    total: string;
    circulating: string;
  };
  numberOfMarkets: number;
  numberOfExchanges: number;
  volume: string;
  marketCap: string;
  fullyDilutedMarketCap: string;
  price: string;
  btcPrice: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: (string | null)[];
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  coinrankingUrl: string;
  tier: number;
  lowVolume: boolean;
  listedAt: number;
  hasContent: boolean;
  notices: null;
  contractAddresses: string[];
  tags: string[];
  isWrappedTrustless: boolean;
  wrappedTo: null;
};

export type CryptoHistoryArgs = {
  coinId: string | undefined;
  timeperiod: string;
};

export type Statistics = {
  title: string;
  value: string;
};

export type CoinHistory = {
  status: string;
  data: {
    change: string;
    history: CoinHistoryEntry[];
  };
};

export type CoinHistoryEntry = {
  price: string;
  timestamp: number;
};

export type ExchangesResponse = {
  status: string;
  data: {
    stats: ExchangeStats;
    exchanges: Exchange[];
  };
};

export type Exchange = {
  coinrankingUrl: string;
  uuid: string;
  name: string;
  iconUrl: string | null;
  numberOfMarkets: number;
  description: string;
  "24hVolume": string;
  rank: number;
  marketShare: string;
  verified: boolean;
  recommended: boolean;
  lastTickerCreatedAt?: number;
};

export type ExchangeStats = {
  "24hVolume": string;
  total: number;
};
