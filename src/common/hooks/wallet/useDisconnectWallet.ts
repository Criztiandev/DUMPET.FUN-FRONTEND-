import { useConnection } from "arweave-wallet-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";

const useDisconnectWallet = () => {
  const { disconnect } = useConnection();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["disconnect-wallet"],
    mutationFn: async () => {
      await disconnect();
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Wallet disconnected successfully",
        variant: "default",
      });
      // Invalidate any queries that depend on wallet state
      queryClient.cancelQueries();
      location.reload;
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
