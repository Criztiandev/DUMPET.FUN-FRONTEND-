export interface MarketInfo {
  AoTokenProcessId: string;
  Concluded: boolean;
  Creator: string;
  Duration: string;
  OptionA: string;
  OptionB: string;
  ProcessId: Number;
  Timestamp: Number;
  Title: string;
  TokenTxId: string;
}

export interface Market {
  BalancesVoteA: {
    [key: string]: string;
  };
  BalancesVoteB: {
    [key: string]: string;
  };
  Concluded: boolean;
  Creator: string;
  Demomination: number;
  MainProcessId: string;
  MarketInfo: MarketInfo;
}

export interface MarketResponse {
  Markets: Market[];
  CurrentPage: number;
  HasMore: boolean;
  TotalRecords: Number;
}

export interface MarketFormValue
  extends Pick<MarketInfo, "Title" | "TokenTxId" | "OptionA" | "OptionB"> {
  thumbnail: string;
  date: Date;
  time: string;
}

export interface MarketRequestValue extends MarketInfo {}
