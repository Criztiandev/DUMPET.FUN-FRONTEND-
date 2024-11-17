import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AccountState {
  isOnline: boolean;
  connect: () => void;
  logout: () => Promise<void>;
}

const INITIAL_STATE = {
  isOnline: false,
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      connect: () => {
        try {
          set({
            isOnline: true,
          });
        } catch (error) {
          console.error("Failed to connect wallet:", error);
          set({
            isOnline: false,
          });
        }
      },

      logout: async () => {
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
      }),
    }
  )
);

// Optional: Type-safe selector hooks
export const useIsOnline = () => useAccountStore((state) => state.isOnline);
