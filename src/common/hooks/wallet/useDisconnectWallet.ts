import { useConnection } from "arweave-wallet-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";

const useDisconnectWallet = () => {
  const { disconnect, connected } = useConnection();

  return useMutation({
    mutationKey: ["disconnect-wallet"],
    mutationFn: async () => {
      if (!connected) {
        throw new Error("Invalid Action");
      }

      await disconnect();
      return true;
    },
    onSuccess: async () => {
      // Show success message
      toast({
        className: "bg-green-500 text-black",
        description: "Wallet disconnected successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to disconnect wallet",
        variant: "destructive",
      });
    },
  });
};

export default useDisconnectWallet;
