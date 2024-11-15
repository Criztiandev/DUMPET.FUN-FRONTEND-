import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Market } from "../interface/market.interface";

interface MarketState {
  markets: Market[];
  filteredMarket: Market[];
  selectedMarket: Market | null;
  searchTerm: string;
}

interface MarketActions {
  searchMarket: (keyword: string) => void;
  clearSearch: () => void;

  addMarket: (market: Market) => void;
  removeMarket: (market: Market) => void;

  setMarkets: (markets: Market[]) => void;
  setSelectedMarket: (market: Market) => void;

  getRandomMarket: () => void;
  getAllMarket: () => Market[];

  resetStore: () => void;
}

type MarketStore = MarketState & MarketActions;

const initialState: MarketState = {
  markets: [],
  filteredMarket: [],
  selectedMarket: null,
  searchTerm: "",
};

const useMarketStore = create<MarketStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      searchMarket: (term: string) => {
        const { markets } = get();
        const searchTerm = term.toLowerCase();

        const filteredMarket = markets.filter(
          (market) =>
            market.Title.toLowerCase().includes(searchTerm) ||
            market.Creator.toLowerCase().includes(searchTerm) ||
            market.TokenTxId.toLowerCase().includes(searchTerm) ||
            market.ProcessId.toString().toLowerCase().includes(searchTerm) ||
            market.OptionA.toLowerCase().includes(searchTerm) ||
            market.OptionB.toLowerCase().includes(searchTerm)
        );

        set({ searchTerm: term, filteredMarket: filteredMarket });
      },

      addMarket: (newMarket: Market) =>
        set(({ markets, ...state }) => {
          const existingMarket = markets.filter(
            (field) =>
              field.Title === newMarket.Title ||
              field.ProcessId === newMarket.ProcessId ||
              field.TokenTxId === newMarket.TokenTxId
          );

          if (existingMarket) {
            return state;
          }

          return {
            ...state,
            markets: [newMarket, ...markets],
          };
        }),

      removeMarket: (newMarket: Market) =>
        set(({ markets, ...state }) => {
          // check existing market
          const existingMarket = markets.filter(
            (field) =>
              field.Title === newMarket.Title ||
              field.ProcessId === newMarket.ProcessId ||
              field.TokenTxId === newMarket.TokenTxId
          );

          // check if the market doesnt exist
          if (existingMarket.length <= 0) {
            return { markets, ...state };
          }

          // filter the market to remove the items
          const filteredMarkets = markets.filter(
            (market) =>
              market.Title !== newMarket.Title &&
              market.ProcessId !== newMarket.ProcessId &&
              market.TokenTxId !== newMarket.TokenTxId
          );

          const selectedMarket =
            state.selectedMarket?.Title === newMarket.Title ||
            state.selectedMarket?.ProcessId === newMarket.ProcessId ||
            state.selectedMarket?.TokenTxId === newMarket.TokenTxId
              ? null
              : state.selectedMarket;

          return {
            ...state,
            markets: filteredMarkets,
            selectedMarket,
          };
        }),

      clearSearch: () => {
        set({ searchTerm: "", filteredMarket: get().markets });
      },

      setMarkets: (markets) => {
        set({ markets: markets, filteredMarket: markets });
      },

      setSelectedMarket: (market) => {
        set({ selectedMarket: market });
      },

      getRandomMarket: () => {
        const { markets } = get();

        if (markets.length === 0) {
          set({ selectedMarket: null });
          return;
        }

        const randomIndex = Math.floor(Math.random() * markets.length);
        set({ selectedMarket: markets[randomIndex] });
      },

      getAllMarket: () => {
        return get().markets;
      },

      resetStore: () => {
        set(initialState);
      },
    }),
    {
      name: "market-store",
      partialize: (state) => ({
        markets: state.markets,
        selectedMarket: state.selectedMarket,
      }),
    }
  )
);

// Selector hooks for better performance
export const useMarkets = () => useMarketStore((state) => state.markets);
export const useSelectedMarket = () =>
  useMarketStore((state) => state.selectedMarket);

export default useMarketStore;
