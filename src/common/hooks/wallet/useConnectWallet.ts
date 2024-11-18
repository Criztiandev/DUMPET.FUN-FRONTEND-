import { useConnection } from "arweave-wallet-kit";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";
import { useAccountStore } from "@/feature/user/store/account-store";

const useConnectWallet = () => {
  const { connect: connectWallet, connected } = useConnection();
  const accountStore = useAccountStore();

  return useMutation({
    mutationKey: ["connect-wallet"],
    mutationFn: async () => {
      if (connected) {
        throw new Error("Wallet is already connected");
      }
      await connectWallet();

      return {
        data: {
          connection: true,
          message: "Wallet connected successfully",
        },
      };
    },
    onSuccess: async ({ data }) => {
      const { message } = data;
      accountStore.credentials();

      toast({
        className: "bg-green-600 text-white border-none",
        title: "Success",
        description: message,
        variant: "default",
      });
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
