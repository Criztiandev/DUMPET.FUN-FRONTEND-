import { MarketInfo } from "@/feature/market/interface/market.interface";
import useMarketStore from "@/feature/market/store/market.store";
import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useWithdrawBalance = () => {
  const { subtractBalanceFromField } = useBalanceStore();

  const { selectedMarket } = useMarketStore();

  const selectedMarketInfo = selectedMarket?.MarketInfo as MarketInfo;

  return useMutation({
    mutationKey: ["POST /withdraw/balance"],
    mutationFn: async (balance: string) => {
      console.log(balance);

      const currentTags = [
        {
          name: "Action",
          value: "Withdraw",
        },
        {
          name: "Quantity",
          value: balance,
        },
      ];

      const response = await message({
        process: selectedMarketInfo?.ProcessId.toString() || "",
        tags: currentTags,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      await result({
        message: response,
        process: selectedMarketInfo?.ProcessId.toString() || "",
      });

      return balance;
    },

    onSuccess: (data) => {
      toast("Balance has Withdraw Successfully", {
        style: {
          textAlign: "center",
          background: "#16A34A",
          color: "white",
        },
        position: "top-center",
      });

      subtractBalanceFromField("UserDepositBalance", String(data));
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

export default useWithdrawBalance;
