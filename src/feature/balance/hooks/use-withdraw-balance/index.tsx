import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useWithdrawBalance = (tokeID: string) => {
  const { subtractBalanceFromField } = useBalanceStore();

  return useMutation({
    mutationKey: ["POST /withdraw/balance"],
    mutationFn: async (balance: string) => {
      const currentAddress = await window.arweaveWallet.getActiveAddress();

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
          value: currentAddress,
        },
      ];

      const response = await message({
        process: tokeID,
        tags: currentTags,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      await result({
        message: response,
        process: tokeID,
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
