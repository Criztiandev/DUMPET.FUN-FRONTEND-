export interface Market {
  url?: string;
  BlockHeight: string;
  Creator: string;
  Duration: string;
  OptionA: string;
  OptionB: string;
  ProcessId: Number;
  Timestamp: Number;
  Title: string;
  TokenTxId: string;
}

export interface MarketResponse {
  Markets: Market[];
  CurrentPage: number;
  HasMore: boolean;
  TotalRecords: Number;
}

export interface MarketFormValue
  extends Pick<Market, "Title" | "TokenTxId" | "OptionA" | "OptionB"> {
  thumbnail: string;
  date: Date;
  time: string;
}

export interface MarketRequestValue
  extends Pick<
    Market,
    "Title" | "Duration" | "TokenTxId" | "OptionA" | "OptionB"
  > {}
