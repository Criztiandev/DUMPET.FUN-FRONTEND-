import { Button } from "@/common/components/atoms/ui/button";
import SelectField from "@/common/components/atoms/form/SelectField";
import InputField from "@/common/components/atoms/form/InputField";
import { toast } from "sonner";
import useMarketStore from "@/feature/market/store/market.store";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useBetOption from "@/feature/bet/hooks/user-bet-option";
import { useParams } from "react-router-dom";
import CancelVoteDialog from "../../molecules/dialog/cancel-vote-dialog";

export interface MarketActionValue {
  selection: string;
  amount: string;
}

const MarketActionControlls = () => {
  const { id: marketID } = useParams();
  const { selectedMarket } = useMarketStore();
  const form = useForm();
  const { mutate, isPending } = useBetOption(marketID || "");

  const currentMarket = selectedMarket?.MarketInfo as MarketInfo;

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

    const distinguishOption =
      currentMarket?.OptionA === selection ? "VoteA" : "VoteB";

    const finalPayload: MarketActionValue = {
      selection: distinguishOption,
      amount: balanceRn.toString(),
    };

    mutate(finalPayload as any);
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
                {
                  label: currentMarket?.OptionA,
                  value: currentMarket?.OptionA,
                },
                {
                  label: currentMarket?.OptionB,
                  value: currentMarket?.OptionB,
                },
              ]}
            />

            <div className="items-center">
              <InputField type="number" name="amount" placeholder="Amount" />
            </div>

            <div className="grid grid-cols-[auto_20%] gap-2">
              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={isPending}
              >
                Place Bet
              </Button>
              <CancelVoteDialog />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MarketActionControlls;
