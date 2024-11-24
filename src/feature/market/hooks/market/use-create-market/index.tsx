import {
  MarketFormValue,
  MarketRequestValue,
} from "@/feature/market/interface/market.interface";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createMarketValidation } from "@/feature/user/validation/market-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/common/hooks/utils/use-toast";
import { useActiveAddress } from "arweave-wallet-kit";
import { useAccountStore } from "@/feature/user/store/account-store";
import useConnectWallet from "@/common/hooks/wallet/useConnectWallet";

// Define response type
interface CreateMarketResponse {
  Messages: Array<{
    Tags: Array<{ name: string; value: string }>;
    Data: string;
  }>;
}

// Define error types
enum CreateMarketError {
  NOT_CONNECTED = "WALLET_NOT_CONNECTED",
  INVALID_INPUT = "INVALID_INPUT",
  NETWORK_ERROR = "NETWORK_ERROR",
  PROCESS_ERROR = "PROCESS_ERROR",
}

const QUERY_KEYS = {
  CREATED_MARKETS: "/GET /created/market/list",
  PENDING_MARKETS: `/GET /market/status/pending`,
  USER_PENDING_MARKETS: (address: string) => `/GET /market/${address}/pending`,
} as const;

const useCreateMarket = () => {
  const { toast } = useToast();
  const { isOnline } = useAccountStore();
  const connectWallet = useConnectWallet();
  const activeAddress = useActiveAddress();
  const queryClient = useQueryClient();
  let errorCause: CreateMarketError = CreateMarketError.INVALID_INPUT;

  // Initialize form with validation
  const form = useForm<MarketFormValue>({
    resolver: zodResolver(createMarketValidation),
  });

  // Helper function to create tags
  const createMarketTags = (payload: MarketRequestValue) => {
    const { Title, Duration, TokenTxId, OptionA, OptionB } = payload;
    return [
      { name: "Action", value: "Create" },
      { name: "Title", value: Title },
      { name: "Duration", value: Duration },
      { name: "TokenTxId", value: TokenTxId },
      { name: "OptionA", value: OptionA },
      { name: "OptionB", value: OptionB },
    ];
  };

  // Helper function to validate wallet connection
  const ensureWalletConnection = async (): Promise<void> => {
    if (!isOnline) {
      try {
        await connectWallet.mutateAsync();
      } catch (error) {
        errorCause = CreateMarketError.NOT_CONNECTED;
        throw new Error("Please connect your wallet to create a market");
      }
    }
  };

  // Helper function to invalidate queries
  const invalidateRelatedQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CREATED_MARKETS] }),
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PENDING_MARKETS] }),
      activeAddress &&
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER_PENDING_MARKETS(activeAddress)],
        }),
    ]);
  };

  const mutation = useMutation({
    mutationKey: ["/POST /create/market"],

    mutationFn: async (
      payload: MarketRequestValue
    ): Promise<CreateMarketResponse> => {
      // First ensure wallet is connected
      await ensureWalletConnection();

      try {
        // Create market message
        const createTags = createMarketTags(payload);

        const mutateResult = await message({
          process: process.env.VITE_DEV_MAIN_PROCESS_ID || "",
          tags: createTags,
          signer: createDataItemSigner(window.arweaveWallet),
        });

        // Get result
        const response = await result({
          message: mutateResult,
          process: process.env.VITE_DEV_MAIN_PROCESS_ID || "",
        });

        if (!response) {
          errorCause = CreateMarketError.PROCESS_ERROR;
          throw new Error("Failed to create market");
        }

        return response;
      } catch (error) {
        // Handle network or process errors
        if (error instanceof Error) {
          errorCause = CreateMarketError.NETWORK_ERROR;
          throw new Error(error.message);
        }
        throw error;
      }
    },

    onSuccess: async (data) => {
      const response = data?.Messages[0];
      const errorTag = response?.Tags?.find((tag) => tag.name === "Error");

      if (errorTag) {
        errorCause = CreateMarketError.PROCESS_ERROR;
        throw new Error(response.Data);
      }

      // Invalidate queries
      await invalidateRelatedQueries();

      // Show success message
      toast({
        className: "bg-green-500/50",
        title: "Market Created Successfully",
        variant: "default",
        description:
          "Your market has been created successfully. Thank you for using the app!",
      });

      // Reset form
      form.reset();
    },

    onError: async (error: Error) => {
      console.error("Market creation error:", error);

      // Invalidate queries even on error
      await invalidateRelatedQueries();

      // Show appropriate error message based on error type
      const errorMessage = (() => {
        switch (errorCause) {
          case CreateMarketError.NOT_CONNECTED:
            return "Please connect your wallet to create a market";
          case CreateMarketError.PROCESS_ERROR:
            return error.message || "Market creation failed";
          case CreateMarketError.NETWORK_ERROR:
            return "Network error occurred. Please try again";
          default:
            return "Something went wrong. Please try again";
        }
      })();

      toast({
        title: "Error Creating Market",
        variant: "destructive",
        description: errorMessage,
      });
    },

    // Retry configuration
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        // Don't retry for wallet connection or validation errors
        if (
          errorCause === CreateMarketError.NOT_CONNECTED ||
          errorCause === CreateMarketError.INVALID_INPUT
        ) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });

  return {
    form,
    mutation,
    isLoading: mutation.isPending || connectWallet.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useCreateMarket;
