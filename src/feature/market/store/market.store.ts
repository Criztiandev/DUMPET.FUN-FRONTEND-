import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Market } from "../interface/market.interface";

interface MarketState {
  markets: Market[];
  filteredMarket: Market[];
  selectedMarket: Market | null;
  searchTerm: string;
}

export interface MarketActions {
  searchMarket: (keyword: string) => void;
  clearSearch: () => void;

  addMarket: (market: Market) => void;
  removeMarket: (market: Market) => void;

  setMarkets: (markets: Market[]) => void;
  setSelectedMarket: (market: Market) => void;

  concludeSelectedMarket: () => void; // New action

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
            market.MarketInfo.Title.toLowerCase().includes(searchTerm) ||
            market.MarketInfo.Creator.toLowerCase().includes(searchTerm) ||
            market.MarketInfo.TokenTxId.toLowerCase().includes(searchTerm) ||
            market.MarketInfo.ProcessId.toString()
              .toLowerCase()
              .includes(searchTerm) ||
            market.MarketInfo.OptionA.toLowerCase().includes(searchTerm) ||
            market.MarketInfo.OptionB.toLowerCase().includes(searchTerm)
        );

        set({ searchTerm: term, filteredMarket: filteredMarket });
      },

      addMarket: (newMarket: Market) =>
        set(({ markets, ...state }) => {
          const existingMarket = markets.filter(
            (field) =>
              field.MarketInfo.Title === newMarket.MarketInfo.Title ||
              field.MarketInfo.ProcessId === newMarket.MarketInfo.ProcessId ||
              field.MarketInfo.TokenTxId === newMarket.MarketInfo.TokenTxId
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
              field.MarketInfo.Title === newMarket.MarketInfo.Title ||
              field.MarketInfo.ProcessId === newMarket.MarketInfo.ProcessId ||
              field.MarketInfo.TokenTxId === newMarket.MarketInfo.TokenTxId
          );

          // check if the market doesnt exist
          if (existingMarket.length <= 0) {
            return { markets, ...state };
          }

          // filter the market to remove the items
          const filteredMarkets = markets.filter(
            (market) =>
              market.MarketInfo.Title !== newMarket.MarketInfo.Title &&
              market.MarketInfo.ProcessId !== newMarket.MarketInfo.ProcessId &&
              market.MarketInfo.TokenTxId !== newMarket.MarketInfo.TokenTxId
          );

          const selectedMarket =
            state.selectedMarket?.MarketInfo.Title ===
              newMarket.MarketInfo.Title ||
            state.selectedMarket?.MarketInfo.ProcessId ===
              newMarket.MarketInfo.ProcessId ||
            state.selectedMarket?.MarketInfo.TokenTxId ===
              newMarket.MarketInfo.TokenTxId
              ? null
              : state.selectedMarket;

          return {
            ...state,
            markets: filteredMarkets,
            selectedMarket,
          };
        }),

      concludeSelectedMarket: () => {
        set((state) => {
          if (!state.selectedMarket) return state;

          // Create updated selected market with concluded set to true
          const updatedSelectedMarket = {
            ...state.selectedMarket,
            concluded: true,
          };

          // Update the market in the markets array
          const updatedMarkets = state.markets.map((market) =>
            market.MarketInfo.ProcessId ===
            state.selectedMarket?.MarketInfo.ProcessId
              ? updatedSelectedMarket
              : market
          );

          // Update filtered markets if search is active
          const updatedFilteredMarket = state.filteredMarket.map((market) =>
            market.MarketInfo.ProcessId ===
            state.selectedMarket?.MarketInfo.ProcessId
              ? updatedSelectedMarket
              : market
          );

          return {
            ...state,
            markets: updatedMarkets,
            filteredMarket: updatedFilteredMarket,
            selectedMarket: updatedSelectedMarket,
          };
        });
      },

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
        selectedMarket: state.selectedMarket,
      }),
    }
  )
);

// Selector hooks for better performance
export const useMarkets = () => useMarketStore((state) => state.markets);
export const useSelectedMarket = () =>
  useMarketStore((state) => state.selectedMarket);
export const useConcludeMarket = () =>
  useMarketStore((state) => state.concludeSelectedMarket);

export default useMarketStore;
