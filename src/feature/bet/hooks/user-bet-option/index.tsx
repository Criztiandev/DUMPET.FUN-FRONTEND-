import { MarketActionValue } from "@/common/components/organism/market-action-controls";
import useConnectWallet from "@/common/hooks/wallet/useConnectWallet";
import { useAccountStore } from "@/feature/user/store/account-store";
import useBalanceStore from "@/feature/user/store/balance-store";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Define types
interface BetResponse {
  amount: string;
  selection: string;
  message: string;
}

interface MessageResponse {
  Messages: Array<{
    Tags: Array<{ name: string; value: string }>;
    Data: string;
  }>;
}

// Define error types as string constants
const BetError = {
  NOT_CONNECTED: "NOT_CONNECTED",
  INVALID_AMOUNT: "INVALID_AMOUNT",
  INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
  INVALID_SELECTION: "INVALID_SELECTION",
  PROCESS_ERROR: "PROCESS_ERROR",
  MARKET_ERROR: "MARKET_ERROR",
} as const;

type BetErrorType = (typeof BetError)[keyof typeof BetError];

// Custom error class
class BetOptionError extends Error {
  constructor(message: string, public errorType: BetErrorType) {
    super(message);
    this.name = "BetOptionError";
  }
}

const QUERY_KEYS = {
  MARKET_DETAILS: (id: string) => `/GET /market/${id}`,
  ACCOUNT_BALANCE: (id: string) => `/GET /account/balance/${id}`,
} as const;

const useBetOption = (marketId: string) => {
  const queryClient = useQueryClient();
  const { isOnline } = useAccountStore();
  const connectWallet = useConnectWallet();
  const { subtractBalanceFromField, balance } = useBalanceStore();

  // Validation helpers
  const validateBet = (value: MarketActionValue): void => {
    const { selection, amount: resultAmmount } = value;

    const amount = Number(resultAmmount);

    if (!selection) {
      throw new BetOptionError(
        "Please select an option",
        BetError.INVALID_SELECTION
      );
    }

    if (!amount || amount <= 0) {
      throw new BetOptionError("Invalid bet amount", BetError.INVALID_AMOUNT);
    }

    const currentBalance = balance?.UserDepositBalance || 0;
    if (amount > Number(currentBalance)) {
      throw new BetOptionError(
        "Insufficient balance for bet, Please click balance and deposit",
        BetError.INSUFFICIENT_BALANCE
      );
    }
  };

  const createBetTags = (value: MarketActionValue) => [
    { name: "Action", value: value.selection },
    { name: "Quantity", value: String(value.amount) },
  ];

  return useMutation({
    mutationKey: [`/POST /market/bet/${marketId}`],

    mutationFn: async (value: MarketActionValue): Promise<BetResponse> => {
      // Ensure wallet is connected
      if (!isOnline) {
        try {
          await connectWallet.mutateAsync();
        } catch (error) {
          throw new BetOptionError(
            "Please connect your wallet to place a bet",
            BetError.NOT_CONNECTED
          );
        }
      }

      // Validate bet
      validateBet(value);

      try {
        // Create and send bet message
        const betTags = createBetTags(value);

        const mutateResult = await message({
          process: marketId,
          tags: betTags,
          signer: createDataItemSigner(window.arweaveWallet),
        });

        const response: MessageResponse = await result({
          message: mutateResult,
          process: marketId,
        });

        // Check for errors in response
        const messageResponse = response.Messages[0];
        const errorTag = messageResponse?.Tags?.find(
          (tag) => tag.name === "Error"
        );

        if (errorTag) {
          throw new BetOptionError(
            messageResponse.Data,
            BetError.PROCESS_ERROR
          );
        }

        return {
          amount: String(value.amount),
          selection: value.selection,
          message: messageResponse.Data,
        };
      } catch (error) {
        if (error instanceof BetOptionError) {
          throw error;
        }
        throw new BetOptionError(
          error instanceof Error ? error.message : "Failed to place bet",
          BetError.PROCESS_ERROR
        );
      }
    },

    onSuccess: ({ amount, selection }) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return (
            queryKey.includes(QUERY_KEYS.MARKET_DETAILS(marketId)) ||
            queryKey.includes(QUERY_KEYS.ACCOUNT_BALANCE(marketId))
          );
        },
      });

      // Update balance
      subtractBalanceFromField("UserDepositBalance", amount);

      // Show success message
      toast(`Successfully placed bet on ${selection}`, {
        position: "top-center",
        style: {
          background: "#38A068",
          color: "white",
        },
      });
    },

    onError: (error: Error) => {
      console.error("Bet error:", error);

      // Handle different error types
      let errorMessage = "Something went wrong";

      if (error instanceof BetOptionError) {
        switch (error.errorType) {
          case BetError.NOT_CONNECTED:
            errorMessage = "Please connect your wallet to place a bet";
            break;
          case BetError.INVALID_AMOUNT:
            errorMessage = "Invalid bet amount";
            break;
          case BetError.INSUFFICIENT_BALANCE:
            errorMessage =
              "Insufficient balance. Please click the balance button and make a deposit.";
            break;
          case BetError.INVALID_SELECTION:
            errorMessage = "Please select a valid option";
            break;
          case BetError.PROCESS_ERROR:
            errorMessage = error.message || "Failed to place bet";
            break;
          default:
            errorMessage = "Something went wrong placing your bet";
        }
      }

      toast(errorMessage, {
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "white",
        },
      });
    },

    // Retry configuration
    retry: (failureCount, error) => {
      if (error instanceof BetOptionError) {
        // Don't retry for validation errors
        if (
          error.errorType === BetError.INVALID_AMOUNT ||
          error.errorType === BetError.INSUFFICIENT_BALANCE ||
          error.errorType === BetError.INVALID_SELECTION ||
          error.errorType === BetError.NOT_CONNECTED
        ) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });
};

export default useBetOption;
