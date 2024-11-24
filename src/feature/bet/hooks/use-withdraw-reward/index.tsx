import { useAccountStore } from "@/feature/user/store/account-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConnection } from "arweave-wallet-kit";
import { toast } from "sonner";

const useWithDrawReward = (marketId: string) => {
  const queryClient = useQueryClient();
  const { isOnline } = useAccountStore();
  const { connect } = useConnection();

  return useMutation({
    mutationKey: ["/POST /market/bet"],

    mutationFn: async () => {
      if (!isOnline) {
        connect();
        throw new Error("Please Connect your wallet");
      }

      const currentTag = [{ name: "Action", value: "WithdrawRewards" }];

      const mutate = await message({
        process: marketId,
        tags: currentTag,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      const response = await result({
        message: mutate,
        process: marketId,
      });

      const hasError = response.Messages[0]?.Tags.find(
        (tag: { name: string }) => tag.name === "Error"
      );

      if (hasError) {
        throw new Error(response.Messages[0]?.Data);
      }

      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return (
            queryKey.includes(`/GET /market/${marketId}`) ||
            queryKey.includes(`/GET /account/balance/${marketId}`)
          );
        },
      });

      toast(`Withdraw Successfully`, {
        position: "top-center",
        style: {
          background: "#38A068",
          color: "white",
        },
      });
    },

    onError: (error) => {
      toast(error.message || "Something went wrong", {
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "white",
        },
      });
    },
  });
};

export default useWithDrawReward;
