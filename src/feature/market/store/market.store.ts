import { create } from "zustand";
import { Market } from "../interface/market.interface";

const storage = {
  getItem: () => {
    try {
      const item = localStorage.getItem("market-store");
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },
  setItem: (selectedMarket: Market | null) => {
    try {
      localStorage.setItem("market-store", JSON.stringify(selectedMarket));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },
};

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
  concludeMarket: () => void;
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

const useMarketStore = create<MarketStore>((set, get) => {
  // Only get selectedMarket from localStorage
  const savedSelectedMarket = storage.getItem();
  const initialStateWithStorage: MarketState = {
    ...initialState,
    selectedMarket: savedSelectedMarket,
  };

  return {
    ...initialStateWithStorage,

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

      set({ searchTerm: term, filteredMarket });
    },

    addMarket: (newMarket: Market) => {
      const { markets } = get();
      const existingMarket = markets.some(
        (field) =>
          field.MarketInfo.Title === newMarket.MarketInfo.Title ||
          field.MarketInfo.ProcessId === newMarket.MarketInfo.ProcessId ||
          field.MarketInfo.TokenTxId === newMarket.MarketInfo.TokenTxId
      );

      if (!existingMarket) {
        const newMarkets = [newMarket, ...markets];
        set({ markets: newMarkets, filteredMarket: newMarkets });
      }
    },

    removeMarket: (marketToRemove: Market) => {
      const { markets, selectedMarket } = get();
      const filteredMarkets = markets.filter(
        (market) =>
          market.MarketInfo.Title !== marketToRemove.MarketInfo.Title &&
          market.MarketInfo.ProcessId !== marketToRemove.MarketInfo.ProcessId &&
          market.MarketInfo.TokenTxId !== marketToRemove.MarketInfo.TokenTxId
      );

      const newSelectedMarket =
        selectedMarket?.MarketInfo.Title === marketToRemove.MarketInfo.Title ||
        selectedMarket?.MarketInfo.ProcessId ===
          marketToRemove.MarketInfo.ProcessId ||
        selectedMarket?.MarketInfo.TokenTxId ===
          marketToRemove.MarketInfo.TokenTxId
          ? null
          : selectedMarket;

      set({
        markets: filteredMarkets,
        selectedMarket: newSelectedMarket,
        filteredMarket: filteredMarkets,
      });
      storage.setItem(newSelectedMarket);
    },

    concludeMarket: () => {
      const { markets, selectedMarket } = get();
      if (!selectedMarket) return;

      const updatedSelectedMarket = {
        ...selectedMarket,
        concluded: true,
      };

      const updatedMarkets = markets.map((market) =>
        market.MarketInfo.ProcessId === selectedMarket.MarketInfo.ProcessId
          ? updatedSelectedMarket
          : market
      );

      set({
        markets: updatedMarkets,
        filteredMarket: updatedMarkets,
        selectedMarket: updatedSelectedMarket,
      });
      storage.setItem(updatedSelectedMarket);
    },

    clearSearch: () => {
      const { markets } = get();
      set({ searchTerm: "", filteredMarket: markets });
    },

    setMarkets: (markets: Market[]) => {
      set({ markets, filteredMarket: markets });
    },

    setSelectedMarket: (market: Market) => {
      set({ selectedMarket: market });
      storage.setItem(market); // Only save selectedMarket
    },

    getRandomMarket: () => {
      const { markets } = get();
      if (markets.length === 0) {
        set({ selectedMarket: null });
        storage.setItem(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * markets.length);
      const selectedMarket = markets[randomIndex];
      set({ selectedMarket });
      storage.setItem(selectedMarket);
    },

    getAllMarket: () => {
      return get().markets;
    },

    resetStore: () => {
      localStorage.removeItem("market-store");
      set(initialState);
    },
  };
});

// Selector hooks for better performance
export const useMarkets = () => useMarketStore((state) => state.markets);
export const useSelectedMarket = () =>
  useMarketStore((state) => state.selectedMarket);
export const useConcludeMarket = () =>
  useMarketStore((state) => state.concludeMarket);

export default useMarketStore;
