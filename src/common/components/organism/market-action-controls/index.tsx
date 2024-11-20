import { X } from "lucide-react";
import { Button } from "@/common/components/atoms/ui/button";
import SelectField from "@/common/components/atoms/form/SelectField";
import InputField from "@/common/components/atoms/form/InputField";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/atoms/ui/tooltip";
import { toast } from "sonner";
import useMarketStore from "@/feature/market/store/market.store";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useBetOption from "@/feature/bet/hooks/user-bet-option";
import { useParams } from "react-router-dom";

export interface MarketActionValue {
  selection: string;
  amount: string;
}

const MarketActionControlls = () => {
  const { id: marketID } = useParams();
  const { selectedMarket } = useMarketStore();
  const form = useForm();
  const { mutate, isPending } = useBetOption(marketID || "");

  const { OptionA, OptionB } = selectedMarket?.MarketInfo as MarketInfo;

  const onSubmit: SubmitHandler<MarketActionValue> = (values) => {
    const { selection, amount } = values;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (!selection) {
      toast.error("Please select a valid option.");
      return;
    }
    const balanceRn = Number(amount) * Math.pow(10, 12);

    const distinguishOption = OptionA === selection ? "VoteA" : "VoteB";

    const finalPayload: MarketActionValue = {
      selection: distinguishOption,
      amount: balanceRn.toString(),
    };

    mutate(finalPayload as any);
  };

  const handleCancelVote = (value: string) => {
    toast(`Cancelled Voted ${value}`, {
      position: "top-center",
      style: {
        background: "#E43E3F",
        color: "white",
      },
    });
  };

  return (
    <div>
      <div className="space-y-4">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="space-y-4"
          >
            <SelectField
              label="Selection"
              name="selection"
              placeholder="Select your side"
              options={[
                { label: OptionA, value: OptionA },
                { label: OptionB, value: OptionB },
              ]}
            />

            <div className="items-center">
              <InputField type="number" name="amount" placeholder="Amount" />
            </div>

            <div className="grid grid-cols-[auto_10%] gap-2">
              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={isPending}
              >
                Place Bet
              </Button>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => handleCancelVote("Option A")}
                    disabled={isPending}
                  >
                    <X />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cancel Vote</TooltipContent>
              </Tooltip>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MarketActionControlls;
