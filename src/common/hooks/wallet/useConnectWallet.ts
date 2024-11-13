import { useConnection } from "arweave-wallet-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";

const useConnectWallet = () => {
  const { connect } = useConnection();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["connect-wallet"],
    mutationFn: async () => {
      const result = await connect();
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Wallet connected successfully",
        variant: "default",
      });
      // Invalidate any queries that depend on wallet state
      queryClient.invalidateQueries({ queryKey: ["wallet-status"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    },
  });
};

export default useConnectWallet;
