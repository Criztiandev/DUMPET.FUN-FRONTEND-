import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AccountState {
  isOnline: boolean;
  address: string;
  setAddres: (value: string) => void;
  credentials: () => void;
  clearCredentials: () => Promise<void>;
}

const INITIAL_STATE = {
  isOnline: false,
  address: "",
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      credentials: () => {
        try {
          set({ isOnline: true, address: "" });
        } catch (error) {
          console.error("Failed to connect wallet:", error);
          set({
            isOnline: false,
          });
        }
      },

      setAddres(value) {
        return set((prev) => ({ ...prev, address: value }));
      },

      clearCredentials: async () => {
        try {
          // Clear all persisted state
          localStorage.removeItem("account-storage");

          // Reset to initial state
          set(INITIAL_STATE);
        } catch (error) {
          console.error("Failed to logout:", error);
        }
      },
    }),

    {
      name: "account-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
      partialize: (state) => ({
        // only persist these fields
        isOnline: state.isOnline,
        address: state.address,
      }),
    }
  )
);

// Optional: Type-safe selector hooks
export const useIsOnline = () => useAccountStore((state) => state.isOnline);
