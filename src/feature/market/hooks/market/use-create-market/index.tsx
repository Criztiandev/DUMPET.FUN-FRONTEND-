import {
  MarketFormValue,
  MarketRequestValue,
} from "@/feature/market/interface/market.interface";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createMarketValidation } from "@/feature/user/validation/market-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/common/hooks/utils/use-toast";
import { useActiveAddress } from "arweave-wallet-kit";

const useCreateMarket = () => {
  const { toast } = useToast();
  const activeAddress = useActiveAddress();
  const form = useForm<MarketFormValue>({
    resolver: zodResolver(createMarketValidation),
  });

  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationKey: ["/POST /create/market"],
    mutationFn: async (payload: MarketRequestValue) => {
      const { Title, Duration, TokenTxId, OptionA, OptionB } = payload;

      const createTags = [
        {
          name: "Action",
          value: "Create",
        },
        {
          name: "Title",
          value: Title,
        },
        {
          name: "Duration",
          value: Duration,
        },
        {
          name: "TokenTxId",
          value: TokenTxId,
        },
        {
          name: "OptionA",
          value: OptionA,
        },
        {
          name: "OptionB",
          value: OptionB,
        },
      ];

      const mutate = await message({
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
        tags: createTags,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      const _result = await result({
        message: mutate,
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
      });

      const response = _result?.Messages[0];
      const hasError = response?.Tags?.find((tag: any) => tag.name === "Error");

      if (hasError) {
        throw new Error(response.Data);
      }

      return response.Data;
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return (
            queryKey.includes(`/GET /created/market/list`) ||
            queryKey.includes(`/GET /market/${activeAddress}/pending`)
          );
        },
      });
      toast({
        className: "bg-green-500/50",
        title: "Created Market Successfully",
        variant: "default",
        description:
          "Your market is created successfully, Thank you for using the app",
      });

      form.reset();
    },

    onError: (error) => {
      form.reset();
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: error.message,
      });
    },
  });

  return { form, mutation };
};

export default useCreateMarket;
