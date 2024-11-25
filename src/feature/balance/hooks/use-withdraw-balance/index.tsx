import { MarketInfo } from "@/feature/market/interface/market.interface";
import useMarketStore from "@/feature/market/store/market.store";
import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAccountStore } from "@/feature/user/store/account-store";
import useConnectWallet from "@/common/hooks/wallet/useConnectWallet";

// Define response and error types
interface WithdrawResponse {
  amount: string;
  message: string;
}

interface MessageResponse {
  Messages: Array<{
    Tags: Array<{ name: string; value: string }>;
    Data: string;
  }>;
}

enum WithdrawError {
  NOT_CONNECTED = "WALLET_NOT_CONNECTED",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
  PROCESS_ERROR = "PROCESS_ERROR",
  MARKET_ERROR = "MARKET_ERROR",
}

const useWithdrawBalance = () => {
  const { subtractBalanceFromField } = useBalanceStore();
  const { selectedMarket } = useMarketStore();
  const { isOnline } = useAccountStore();
  const connectWallet = useConnectWallet();
  const { balance } = useBalanceStore();

  let errorCause: WithdrawError = WithdrawError.INVALID_AMOUNT;

  const selectedMarketInfo = selectedMarket?.MarketInfo as MarketInfo;

  // Validation helpers
  const validateAmount = (withdrawAmount: string): void => {
    // Check if the amount is a valid number
    if (isNaN(Number(withdrawAmount))) {
      errorCause = WithdrawError.INVALID_AMOUNT;
      throw new Error("Invalid withdrawal amount: Must be a number");
    }

    // Check if the amount is positive
    if (Number(withdrawAmount) <= 0) {
      errorCause = WithdrawError.INVALID_AMOUNT;
      throw new Error("Invalid withdrawal amount: Must be greater than 0");
    }

    // Check if user has sufficient balance
    const currentBalance = balance?.UserDepositBalance || 0;
    if (Number(withdrawAmount) > Number(currentBalance)) {
      errorCause = WithdrawError.INSUFFICIENT_BALANCE;
      throw new Error("Insufficient balance for withdrawal");
    }
  };

  const validateMarket = (): void => {
    if (!selectedMarketInfo?.ProcessId) {
      errorCause = WithdrawError.MARKET_ERROR;
      throw new Error("Invalid market process");
    }
  };

  const createWithdrawTags = (amount: string) => [
    { name: "Action", value: "Withdraw" },
    { name: "Quantity", value: amount },
  ];

  return useMutation({
    mutationKey: ["POST /withdraw/balance"],

    mutationFn: async (amount: string): Promise<WithdrawResponse> => {
      // Connect wallet if needed
      if (!isOnline) {
        try {
          await connectWallet.mutateAsync();
        } catch (error) {
          errorCause = WithdrawError.NOT_CONNECTED;
          throw new Error("Please connect your wallet to withdraw");
        }
      }

      // Validate withdrawal amount and market
      validateAmount(amount);
      validateMarket();

      try {
        // Create and send withdraw message
        const withdrawTags = createWithdrawTags(amount);

        const mutateResult = await message({
          process: selectedMarketInfo.ProcessId.toString(),
          tags: withdrawTags,
          signer: createDataItemSigner(window.arweaveWallet),
        });

        const response: MessageResponse = await result({
          message: mutateResult,
          process: selectedMarketInfo.ProcessId.toString(),
        });

        // Check for errors in response
        const messageResponse = response.Messages[0];
        const errorTag = messageResponse?.Tags?.find(
          (tag) => tag.name === "Error"
        );

        if (errorTag) {
          errorCause = WithdrawError.PROCESS_ERROR;
          throw new Error(messageResponse.Data);
        }

        return {
          amount,
          message: messageResponse.Data,
        };
      } catch (error) {
        if (error instanceof Error) {
          errorCause = WithdrawError.PROCESS_ERROR;
          throw new Error(error.message);
        }
        throw error;
      }
    },

    onSuccess: ({ amount }) => {
      // Show success toast
      toast("Balance Withdrawn Successfully", {
        style: {
          textAlign: "center",
          background: "#16A34A",
          color: "white",
        },
        position: "top-center",
      });

      // Update balance store
      subtractBalanceFromField("UserDepositBalance", amount);
    },

    onError: (error: Error) => {
      console.error("Withdrawal error:", error);

      // Show appropriate error message based on error type
      const errorMessage = (() => {
        switch (errorCause) {
          case WithdrawError.NOT_CONNECTED:
            return "Please connect your wallet to withdraw";
          case WithdrawError.INVALID_AMOUNT:
            return error.message || "Invalid withdrawal amount";
          case WithdrawError.INSUFFICIENT_BALANCE:
            return "Insufficient balance for withdrawal";
          case WithdrawError.MARKET_ERROR:
            return "Invalid market configuration";
          case WithdrawError.PROCESS_ERROR:
            return error.message || "Withdrawal failed";
          default:
            return "Something went wrong. Please try again";
        }
      })();

      toast(errorMessage, {
        style: {
          textAlign: "center",
          background: "#DD2627",
          color: "white",
        },
        position: "top-center",
      });
    },

    // Retry configuration
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        // Don't retry for validation or balance errors
        if (
          errorCause === WithdrawError.INVALID_AMOUNT ||
          errorCause === WithdrawError.INSUFFICIENT_BALANCE ||
          errorCause === WithdrawError.NOT_CONNECTED
        ) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });
};

export default useWithdrawBalance;
