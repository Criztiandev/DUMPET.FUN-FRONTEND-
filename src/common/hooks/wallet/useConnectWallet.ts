import { useConnection } from "arweave-wallet-kit";
import { useMutation } from "@tanstack/react-query";

const useConnectWallet = () => {
  const { connect } = useConnection();

  return useMutation({
    mutationKey: ["Mutation /connect-wallet"],
    mutationFn: async () => {
      await connect();
      return true;
    },

    onSuccess: () => {
      alert("Wallet is Connected");
    },

    onError: () => {
      alert("Wallet connection failed");
    },
  });
};

export default useConnectWallet;
