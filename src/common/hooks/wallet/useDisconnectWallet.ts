import { useConnection } from "arweave-wallet-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";
import { useAccountStore } from "@/feature/user/store/account-store";

const useDisconnectWallet = () => {
  const { disconnect, connected } = useConnection();
  const { clearCredentials } = useAccountStore();
  const queryClient = useQueryClient();

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
      toast({
        className: "bg-green-500 text-black border-none",
        description: "Wallet disconnected successfully",
        variant: "default",
      });

      clearCredentials();
      queryClient.invalidateQueries();
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
