import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useMarketConclude = (marketId: string) => {
  const queryClient = useQueryClient();

  const { subtractBalanceFromField } = useBalanceStore();

  return useMutation({
    mutationKey: ["/POST /market/bet"],
    mutationFn: async () => {
      const currentTag = [{ name: "Action", value: "Conclude" }];

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

      const payload = JSON.parse(response.Messages[0]?.Data);
      return payload;
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

      subtractBalanceFromField("BalanceVoteA", "0");
      subtractBalanceFromField("BalanceVoteB", "0");
      subtractBalanceFromField("UserDepositBalance", "0");
      subtractBalanceFromField("UserBalanceAllVotes", "0");

      toast(`Successfully Cancelled Vote`, {
        position: "top-center",
        style: {
          background: "#38A068",
          color: "white",
        },
      });
    },

    onError: (error) => {
      toast(error.message, {
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "white",
        },
      });
    },
  });
};

export default useMarketConclude;
