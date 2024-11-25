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
import useWithDrawReward from "@/feature/bet/hooks/use-withdraw-reward";

export interface MarketActionValue {
  selection: string;
  amount: string;
}

const MarketActionControlls = () => {
  const { id: marketID } = useParams();
  const form = useForm();

  const { selectedMarket } = useMarketStore();
  const currentMarket = selectedMarket?.MarketInfo as MarketInfo;

  const { mutate, isPending } = useBetOption(marketID || "");
  const { mutate: rewardMutate } = useWithDrawReward(
    String(selectedMarket?.MarketInfo.ProcessId) || ""
  );

  const onSubmit: SubmitHandler<MarketActionValue> = (values) => {
    const { selection, amount } = values;

    // Check if amount is valid and is a whole number
    if (
      !amount ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0 ||
      !Number.isInteger(Number(amount)) ||
      amount.includes(".")
    ) {
      toast.error("Please enter a valid whole number without decimals.");
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
              disabled={selectedMarket?.MarketInfo.Concluded}
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
              <InputField
                type="number"
                name="amount"
                placeholder="Amount"
                disabled={selectedMarket?.MarketInfo.Concluded}
              />
            </div>

            <div className="grid grid-cols-[auto_20%] gap-2">
              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={isPending || selectedMarket?.MarketInfo.Concluded}
              >
                Place Bet
              </Button>
              <CancelVoteDialog
                disabled={selectedMarket?.MarketInfo.Concluded}
              />
            </div>

            {String(selectedMarket?.Creator) === String(currentMarket) && (
              <div className="w-full">
                <Button className="w-full" onClick={() => rewardMutate()}>
                  Withdraw AO
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MarketActionControlls;
