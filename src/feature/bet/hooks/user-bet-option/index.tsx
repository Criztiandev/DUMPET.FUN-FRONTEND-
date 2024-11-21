import { MarketActionValue } from "@/common/components/organism/market-action-controls";
import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useBetOption = (marketId: string) => {
  const queryClient = useQueryClient();

  const { subtractBalanceFromField } = useBalanceStore();

  return useMutation({
    mutationKey: ["/POST /market/bet"],
    mutationFn: async (value: any) => {
      const { selection, amount } = value as MarketActionValue;

      const currentTag = [
        {
          name: "Action",
          value: selection,
        },
        {
          name: "Quantity",
          value: String(amount),
        },
      ];

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

      return { amount };
    },

    onSuccess: ({ amount }: any) => {
      queryClient.invalidateQueries({
        queryKey: [`/GET /market/details/${marketId}`],
      });

      subtractBalanceFromField("UserDepositBalance", amount);

      toast(`Successfully Voted`, {
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

export default useBetOption;