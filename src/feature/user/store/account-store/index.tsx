import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Core account types
interface AccountData {
  address: string;
  chainId?: number;
  username?: string;
  lastLogin?: Date;
}

interface AccountState extends AccountData {
  isOnline: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AccountActions {
  // Account management
  setAddress: (address: string) => void;
  setChainId: (chainId: number) => void;
  setUsername: (username: string) => void;

  // Connection management
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;

  // Error handling
  resetError: () => void;
}

type AccountStore = AccountState & AccountActions;

const INITIAL_STATE: AccountState = {
  isOnline: false,
  isLoading: false,
  error: null,
  address: "",
  chainId: undefined,
  username: undefined,
  lastLogin: undefined,
};

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setAddress: (address: string) => {
        set((state) => ({
          ...state,
          address,
          lastLogin: new Date(),
        }));
      },

      setChainId: (chainId: number) => {
        set((state) => ({
          ...state,
          chainId,
        }));
      },

      setUsername: (username: string) => {
        set((state) => ({
          ...state,
          username,
        }));
      },

      connect: async () => {
        set({ isLoading: true, error: null });

        try {
          // Add your wallet connection logic here
          // For example:
          // const provider = await detectEthereumProvider();
          // const accounts = await provider.request({ method: 'eth_requestAccounts' });
          // const chainId = await provider.request({ method: 'eth_chainId' });

          set({
            isOnline: true,
            isLoading: false,
            lastLogin: new Date(),
            // address: accounts[0],
            // chainId: parseInt(chainId, 16),
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to connect wallet";
          set({
            isOnline: false,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      disconnect: async () => {
        set({ isLoading: true, error: null });

        try {
          // Add any cleanup logic here
          // For example: unsubscribe from events, clear local storage, etc.

          localStorage.removeItem("account-storage");

          set({
            ...INITIAL_STATE,
            lastLogin: new Date(),
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to disconnect wallet";
          set((state) => ({
            ...state,
            isLoading: false,
            error: errorMessage,
          }));
          throw error;
        }
      },

      switchChain: async (chainId: number) => {
        set({ isLoading: true, error: null });

        try {
          // Add chain switching logic here
          // For example:
          // await provider.request({
          //   method: 'wallet_switchEthereumChain',
          //   params: [{ chainId: `0x${chainId.toString(16)}` }],
          // });

          set((state) => ({
            ...state,
            chainId,
            isLoading: false,
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to switch chain";
          set((state) => ({
            ...state,
            isLoading: false,
            error: errorMessage,
          }));
          throw error;
        }
      },

      resetError: () => {
        set({ error: null });
      },
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        address: state.address,
        chainId: state.chainId,
        username: state.username,
        isOnline: state.isOnline,
        lastLogin: state.lastLogin,
      }),
    }
  )
);

// Selector hooks for common use cases
export const useIsOnline = () => useAccountStore((state) => state.isOnline);
export const useAddress = () => useAccountStore((state) => state.address);
export const useChainId = () => useAccountStore((state) => state.chainId);
export const useUsername = () => useAccountStore((state) => state.username);
export const useAccountError = () => useAccountStore((state) => state.error);
export const useIsLoading = () => useAccountStore((state) => state.isLoading);

// Combined selector for full account info
export const useAccountInfo = () =>
  useAccountStore((state) => ({
    address: state.address,
    chainId: state.chainId,
    username: state.username,
    isOnline: state.isOnline,
    lastLogin: state.lastLogin,
  }));
