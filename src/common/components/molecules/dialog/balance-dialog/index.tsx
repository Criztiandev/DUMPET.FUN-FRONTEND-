import { Button } from "@/common/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/atoms/ui/dialog";
import { Wallet } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "@/common/components/atoms/form/InputField";
import RadioGroupField, {
  RadioGroupItemField,
} from "@/common/components/atoms/form/RadioGroupField";
import useDepositBalance from "@/feature/balance/hooks/use-deposit-balance";
import useWithDrawBalance from "@/feature/balance/hooks/use-withdraw-balance";
import { useConnection } from "arweave-wallet-kit";
import { useAccountStore } from "@/feature/user/store/account-store";
import { toast } from "sonner";
import useBalanceStore from "@/feature/user/store/balance-store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchAccountBalance from "@/feature/balance/hooks/use-fetch-account-balance";
import BigNumber from "bignumber.js";

export function BalanceDialog() {
  const { id } = useParams();
  const form = useForm();
  const { connected } = useConnection();
  const { isOnline } = useAccountStore();

  const { data: balanceData } = useFetchAccountBalance(id || "0");
  const { setBalance } = useBalanceStore();

  const { balance } = useBalanceStore();
  const { mutate: depositMutate, isPending: depositStatus } = useDepositBalance(
    import.meta.env.VITE_DEV_DUMPET_TOKEN_TXID
  );
  const { mutate: withdrawMutate, isPending: withdrawtStatus } =
    useWithDrawBalance(import.meta.env.VITE_DEV_DUMPET_TOKEN_TXID);

  console.log(balanceData);

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData);
    }
  }, [balanceData]);

  const onSubmit = () => {
    if (!connected || !isOnline) {
      toast("Invalid Action", {
        style: {
          background: "#DD2627",
          color: "white",
        },
        position: "top-center",
      });
    }

    const value = form.getValues();
    const { transactionType, balance } = value;

    const balancePow = balance * Math.pow(10, 12);
    const balanceBN = new BigNumber(balancePow).toFixed(
      12,
      BigNumber.ROUND_DOWN
    );

    switch (transactionType) {
      case "deposit":
        depositMutate(balanceBN.toString());
        break;

      case "withdraw":
        withdrawMutate(balanceBN.toString());
        break;

      default:
        toast("Invalid Action", {
          style: {
            background: "#DD2627",
            color: "white",
          },
          position: "top-center",
        });
        break;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start space-x-2 px-2" variant="ghost">
          <Wallet size={22} />
          <span>Balance</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Balance</DialogTitle>
          <DialogDescription>
            Current Balance: {balance?.UserDepositBalance}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              type="number"
              label="Balance"
              name="balance"
              placeholder="Enter Balance"
            />

            <RadioGroupField name="transactionType">
              <RadioGroupItemField
                label="Deposit"
                name="transactionType"
                value="deposit"
              />

              <RadioGroupItemField
                label="Withdraw"
                name="transactionType"
                value="withdraw"
              />
            </RadioGroupField>

            <DialogFooter>
              <Button type="submit" disabled={depositStatus || withdrawtStatus}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
