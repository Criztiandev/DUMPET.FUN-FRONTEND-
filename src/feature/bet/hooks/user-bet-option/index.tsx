import { MarketActionValue } from "@/common/components/organism/market-action-controls";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useBetOption = (marketId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["/POST /market/bet"],
    mutationFn: async (value: any): Promise<string> => {
      const { selection, amount } = value as MarketActionValue;

      console.log(selection);

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

      const response = await message({
        process: marketId,
        tags: currentTag,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      const payload = await result({
        message: response,
        process: marketId,
      });

      return payload?.Messages[0];
    },

    onSuccess: ({ Data, Tags }: any) => {
      const hasError = Tags.find(
        (tag: { name: string }) => tag.name === "Error"
      );

      if (hasError) {
        throw new Error(Data);
      }

      queryClient.invalidateQueries({
        queryKey: [`/GET /market/details/${marketId}`],
      });

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
// /GET /market/details/${marketId}
