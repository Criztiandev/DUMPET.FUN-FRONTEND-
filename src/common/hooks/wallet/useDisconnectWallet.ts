import { useConnection } from "arweave-wallet-kit";
import { useMutation } from "@tanstack/react-query";

const useDisconnectWallet = () => {
  const { disconnect } = useConnection();

  return useMutation({
    mutationKey: ["Mutation /disconnect-wallet"],
    mutationFn: async () => {
      await disconnect();
      return true;
    },

    onSuccess: () => {
      console.log("Wallet is Disconnected");
    },

    onError: () => {
      alert("Wallet disconnection failed");
    },
  });
};

export default useDisconnectWallet;
