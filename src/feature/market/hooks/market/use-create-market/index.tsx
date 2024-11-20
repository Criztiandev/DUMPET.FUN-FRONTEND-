import {
  MarketFormValue,
  MarketRequestValue,
} from "@/feature/market/interface/market.interface";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createMarketValidation } from "@/feature/user/validation/market-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/common/hooks/utils/use-toast";

const useCreateMarket = () => {
  const { toast } = useToast();
  const form = useForm<MarketFormValue>({
    resolver: zodResolver(createMarketValidation),
  });

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

      const response = await message({
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
        tags: createTags,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      return await result({
        message: response,
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
      });
    },

    onSuccess: async (data) => {
      const error = data.Messages[0]?.Tags?.find(
        (tag: any) => tag.name === "Error"
      );

      if (error) {
        throw new Error(data.Messages[0].Data);
      }

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
      toast({
        title: "Something went wrong, Please try again later",
        variant: "destructive",
        description: error.message,
      });
    },
  });

  return { form, mutation };
};

export default useCreateMarket;
