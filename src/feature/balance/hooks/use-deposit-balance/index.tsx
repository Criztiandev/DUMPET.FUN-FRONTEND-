import useConnectWallet from "@/common/hooks/wallet/useConnectWallet";
import { isMarketDeadlineValid } from "@/common/utils/time.utilts";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import useMarketStore from "@/feature/market/store/market.store";
import { useAccountStore } from "@/feature/user/store/account-store";
import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Define response and error types
interface DepositResponse {
  message: string;
  amount: string;
}

interface MessageResponse {
  Messages: Array<{
    Tags: Array<{ name: string; value: string }>;
    value: string;
  }>;
}

enum DepositError {
  NOT_CONNECTED = "WALLET_NOT_CONNECTED",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  MARKET_CONCLUDED = "MARKET_CONCLUDED",
  PROCESS_ERROR = "PROCESS_ERROR",
}

const useDepositBalance = (tokenID: string) => {
  const { addBalanceToField } = useBalanceStore();
  const { selectedMarket } = useMarketStore();
  const { isOnline } = useAccountStore();
  const connectWallet = useConnectWallet();
  let errorCause: DepositError = DepositError.INVALID_AMOUNT;

  const selectedMarketInfo = selectedMarket?.MarketInfo as MarketInfo;

  const validateBalance = (balance: string): void => {
    // Check if the balance is a valid number
    if (isNaN(Number(balance))) {
      errorCause = DepositError.INVALID_AMOUNT;
      throw new Error("Invalid balance format: Must be a number");
    }

    // Additional validation for negative or zero values
    if (Number(balance) <= 0) {
      errorCause = DepositError.INVALID_AMOUNT;
      throw new Error("Invalid balance: Must be greater than 0");
    }
  };

  const validateMarketDeadline = (): void => {
    const currentDate = new Date();
    const marketTimeUnix = selectedMarketInfo?.Duration;

    if (!isMarketDeadlineValid(currentDate, Number(marketTimeUnix))) {
      errorCause = DepositError.MARKET_CONCLUDED;
      throw new Error("Invalid Action: Market has already concluded");
    }
  };

  const createDepositTags = (balance: string) => [
    { name: "Action", value: "Transfer" },
    { name: "Quantity", value: balance },
    { name: "Recipient", value: selectedMarketInfo?.ProcessId.toString() },
  ];

  return useMutation({
    mutationKey: [
      `POST /deposit/balance/${selectedMarketInfo?.ProcessId}/${tokenID}`,
    ],

    mutationFn: async (balance: string): Promise<DepositResponse> => {
      // Validate balance format first
      validateBalance(balance);

      // Connect wallet if needed
      if (!isOnline) {
        try {
          await connectWallet.mutateAsync();
        } catch (error) {
          errorCause = DepositError.NOT_CONNECTED;
          throw new Error("Please connect your wallet to deposit");
        }
      }

      validateMarketDeadline();

      try {
        // Create and send deposit message
        const depositTags = createDepositTags(balance);

        const mutateResult = await message({
          process: tokenID,
          tags: depositTags,
          signer: createDataItemSigner(window.arweaveWallet),
        });

        const response: MessageResponse = await result({
          message: mutateResult,
          process: tokenID,
        });

        // Check for errors in response
        const messageResponse = response.Messages[0];
        const errorTag = messageResponse?.Tags?.find(
          (tag) => tag.name === "Error"
        );

        if (errorTag) {
          errorCause = DepositError.PROCESS_ERROR;
          throw new Error(errorTag.value);
        }

        return {
          message: messageResponse.value,
          amount: balance,
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw error;
      }
    },

    onSuccess: ({ amount }) => {
      // Show success toast
      toast("Balance Deposited Successfully", {
        style: {
          textAlign: "center",
          background: "#16A34A",
          color: "white",
        },
        position: "top-center",
      });

      // Update balance store
      addBalanceToField("UserDepositBalance", String(amount));
    },

    onError: (error: Error) => {
      toast(error.message, {
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
        // Don't retry for validation or market state errors
        if (
          errorCause === DepositError.INVALID_AMOUNT ||
          errorCause === DepositError.MARKET_CONCLUDED ||
          errorCause === DepositError.NOT_CONNECTED
        ) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });
};

export default useDepositBalance;
