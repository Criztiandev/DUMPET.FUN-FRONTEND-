import { formatArweaveTokenAmount } from "@/common/utils/format.utils";
import { isMarketDeadlineValid } from "@/common/utils/time.utilts";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import useMarketStore from "@/feature/market/store/market.store";
import { useAccountStore } from "@/feature/user/store/account-store";
import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { useConnection } from "arweave-wallet-kit";
import { toast } from "sonner";

const useDepositBalance = (tokenID: string) => {
  const { addBalanceToField } = useBalanceStore();
  const { selectedMarket } = useMarketStore();
  const { isOnline } = useAccountStore();
  const { connect } = useConnection();

  const selectedMarketInfo = selectedMarket?.MarketInfo as MarketInfo;

  return useMutation({
    mutationKey: [
      `POST /deposit/balance/${selectedMarketInfo?.ProcessId}/${tokenID}`,
    ],
    mutationFn: async (balance: string) => {
      if (!isOnline) {
        connect();
        throw new Error("Please Connect your wallet");
      }

      const formattedBalance = formatArweaveTokenAmount(Number(balance));

      if (formattedBalance >= 250 || Number.isNaN(formattedBalance)) {
        throw new Error("Invalid Balance, Reach Maximum Output");
      }

      const currentDate = new Date();
      const marketTimeUnix = selectedMarketInfo?.Duration;

      if (!isMarketDeadlineValid(currentDate, Number(marketTimeUnix))) {
        throw new Error("Invalid Action: Market is already concluded");
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

      const mutate = await message({
        process: tokenID,
        tags: currentTags,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      const payload = await result({
        message: mutate,
        process: tokenID,
      });

      // No Error Message for handling this
      const response = payload.Messages[0];
      const hasError = response?.Tags?.find((tag: any) => tag.name === "Error");

      if (hasError) {
        console.log(response);
        throw new Error(response.Data);
      }

      return {
        message: response.Data,
        amount: balance,
      };
    },

    onSuccess: ({ amount }) => {
      toast("Balance has Deposit Successfully", {
        style: {
          textAlign: "center",
          background: "#16A34A",
          color: "white",
        },
        position: "top-center",
      });

      addBalanceToField("UserDepositBalance", String(amount));
    },

    onError: (data) => {
      console.log(data);

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
