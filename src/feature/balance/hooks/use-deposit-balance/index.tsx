import { formatArweaveTokenAmount } from "@/common/utils/format.utils";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import useMarketStore from "@/feature/market/store/market.store";
import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDepositBalance = (tokenID: string) => {
  const { addBalanceToField } = useBalanceStore();
  const { selectedMarket } = useMarketStore();

  const selectedMarketInfo = selectedMarket?.MarketInfo as MarketInfo;

  return useMutation({
    mutationKey: ["POST /deposit/balance"],
    mutationFn: async (balance: string) => {
      console.log(formatArweaveTokenAmount(balance));
      const formattedBalance = formatArweaveTokenAmount(Number(balance));

      if (formattedBalance >= 250 || Number.isNaN(formattedBalance)) {
        throw new Error("Invalid Balance, Reach Maximum Output");
      }

      const currentTags = [
        {
          name: "Action",
          value: "Transfer",
        },
        {
          name: "Quantity",
          value: balance,
        },
        {
          name: "Recipient",
          value: selectedMarketInfo?.ProcessId.toString(),
        },
      ];

      const response = await message({
        process: tokenID,
        tags: currentTags,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      await result({
        message: response,
        process: tokenID,
      });

      return balance;
    },

    onSuccess: (data) => {
      toast("Balance has Deposit Successfully", {
        style: {
          textAlign: "center",
          background: "#16A34A",
          color: "white",
        },
        position: "top-center",
      });

      addBalanceToField("UserDepositBalance", String(data));
    },

    onError: (data) => {
      toast(data?.message || "Something went wrong", {
        style: {
          textAlign: "center",
          background: "#DD2627",
          color: "white",
        },
        position: "top-center",
      });
    },
  });
};

export default useDepositBalance;
