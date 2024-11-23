import { useConnection } from "arweave-wallet-kit";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";
import { useAccountStore } from "@/feature/user/store/account-store";

interface ConnectWalletResponse {
  address: string;
  permissions: string[];
  message: string;
}

const useConnectWallet = () => {
  const { connect: connectWallet, connected, disconnect } = useConnection();
  const {
    setAddress,
    connect: setConnected,
    disconnect: setDisconnected,
  } = useAccountStore();

  return useMutation({
    mutationKey: ["connect-wallet"],

    mutationFn: async (): Promise<ConnectWalletResponse> => {
      // Check if wallet is already connected
      if (connected) {
        throw new Error("Wallet is already connected");
      }

      try {
        // Connect wallet
        await connectWallet();

        // Get wallet address after connection
        const address = await window.arweaveWallet.getActiveAddress();
        if (!address) {
          throw new Error("Failed to get wallet address");
        }

        return {
          address,
          permissions: [], // Add permissions if available from wallet
          message: "Wallet connected successfully",
        };
      } catch (error) {
        // Handle specific wallet connection errors
        if (error instanceof Error) {
          switch (error.message) {
            case "User rejected":
              throw new Error("Connection rejected by user");
            case "Wallet not found":
              throw new Error("Arweave wallet not detected");
            default:
              throw error;
          }
        }
        throw new Error("Failed to connect wallet");
      }
    },

    onSuccess: async (response) => {
      const { address, message } = response;

      // Update account store
      setAddress(address);
      setConnected();

      // Show success toast
      toast({
        className: "bg-green-600 text-white border-none",
        title: "Connected",
        description: message,
        variant: "default",
      });
    },

    onError: async (error) => {
      // Reset connection state
      try {
        await disconnect();
        setDisconnected();
      } catch {
        // Ignore cleanup errors
      }

      // Show error toast
      toast({
        title: "Connection Failed",
        description:
          error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    },

    // Retry configuration
    retry: (failureCount, error) => {
      // Don't retry if user rejected or wallet not found
      if (error instanceof Error) {
        if (
          error.message.includes("rejected") ||
          error.message.includes("not found")
        ) {
          return false;
        }
      }
      return failureCount < 3; // Retry up to 3 times for other errors
    },
  });
};

export default useConnectWallet;
