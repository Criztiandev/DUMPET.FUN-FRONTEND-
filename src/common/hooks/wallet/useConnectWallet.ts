import { useConnection } from "arweave-wallet-kit";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../utils/use-toast";

const useConnectWallet = () => {
  const { connect, connected } = useConnection();

  return useMutation({
    mutationKey: ["connect-wallet"],
    mutationFn: async () => {
      if (connected) {
        throw new Error("Wallet is already connected");
      }
      await connect();

      return true;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: "Wallet connected successfully",
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
