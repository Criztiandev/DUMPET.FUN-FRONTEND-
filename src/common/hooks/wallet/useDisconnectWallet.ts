import { useConnection } from "arweave-wallet-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";
import { useAccountStore } from "@/feature/user/store/account-store";
import useLocalStorage from "../utils/useLocalStorage";

// Define response type
interface DisconnectResponse {
  success: boolean;
  message: string;
}

// Define which queries should be invalidated
const QUERIES_TO_INVALIDATE = [
  "wallet-info",
  "user-balance",
  "transactions",
  // Add other query keys that should be invalidated
] as const;

const useDisconnectWallet = () => {
  const { disconnect, connected } = useConnection();
  const { disconnect: disconnectStore, resetError } = useAccountStore();
  const queryClient = useQueryClient();
  const { removeItem } = useLocalStorage("market-store");

  return useMutation({
    mutationKey: ["disconnect-wallet"],

    mutationFn: async (): Promise<DisconnectResponse> => {
      // Validate connection state
      if (!connected) {
        throw new Error("No wallet is currently connected");
      }

      try {
        // Attempt to disconnect
        await disconnect();

        return {
          success: true,
          message: "Wallet disconnected successfully",
        };
      } catch (error) {
        // Handle specific disconnect errors
        if (error instanceof Error) {
          switch (error.message) {
            case "Timeout":
              throw new Error("Disconnect operation timed out");
            case "Already disconnected":
              throw new Error("Wallet is already disconnected");
            default:
              throw error;
          }
        }
        throw new Error("Failed to disconnect wallet");
      }
    },

    onSuccess: async ({ message }) => {
      disconnectStore();
      resetError();
      removeItem();

      // Invalidate relevant queries
      await Promise.all([
        // Invalidate specific queries
        ...QUERIES_TO_INVALIDATE.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        ),
        // Remove specific queries from cache
        ...QUERIES_TO_INVALIDATE.map((queryKey) =>
          queryClient.removeQueries({ queryKey: [queryKey] })
        ),
      ]);

      // Show success message
      toast({
        className: "bg-green-500 text-black border-none",
        title: "Disconnected",
        description: message,
        variant: "default",
      });
    },

    onError: (error) => {
      // Show error message
      toast({
        title: "Disconnect Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to disconnect wallet",
        variant: "destructive",
      });

      // Optionally reset store state on error
      disconnectStore();
      resetError();
    },

    // Retry configuration
    retry: (failureCount, error) => {
      if (
        error instanceof Error &&
        error.message === "No wallet is currently connected"
      ) {
        return false; // Don't retry if no wallet is connected
      }
      return failureCount < 2; // Retry up to 2 times for other errors
    },
  });
};

// Export utilities for reuse
export const getWalletQueries = () => QUERIES_TO_INVALIDATE;

export default useDisconnectWallet;
