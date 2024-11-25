import { Button, buttonVariants } from "@/common/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
import { useEffect, useState } from "react";
import useFetchAccountBalance from "@/feature/balance/hooks/use-fetch-account-balance";
import { VariantProps } from "class-variance-authority";
import { formatArweaveTokenAmount } from "@/common/utils/format.utils";
import { Badge } from "@/common/components/atoms/ui/badge";
import useMarketStore from "@/feature/market/store/market.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validateMarketTimeWithDetails } from "@/common/utils/time.utilts";

// Form validation schema
const balanceFormSchema = z.object({
  balance: z
    .string()
    .min(1, "Balance is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Balance must be greater than 0")
    .refine((val) => Number(val) <= 250, "Balance must not exceed 250"),
  transactionType: z.enum(["deposit", "withdraw"], {
    required_error: "Please select a transaction type",
  }),
});

type BalanceFormValues = z.infer<typeof balanceFormSchema>;

interface Props extends VariantProps<typeof buttonVariants> {}

export function BalanceDialog(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { connected } = useConnection();
  const { isOnline } = useAccountStore();
  const { selectedMarket } = useMarketStore();
  const { data: balanceData } = useFetchAccountBalance();
  const { setBalance, balance } = useBalanceStore();

  // Initialize form with validation
  const form = useForm<BalanceFormValues>({
    resolver: zodResolver(balanceFormSchema),
    defaultValues: {
      balance: "",
      transactionType: undefined,
    },
  });

  const { mutate: depositMutate, isPending: depositStatus } = useDepositBalance(
    selectedMarket?.MarketInfo.TokenTxId || ""
  );
  const { mutate: withdrawMutate, isPending: withdrawStatus } =
    useWithDrawBalance();

  // Update balance when data changes
  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData);
    }
  }, [balanceData, setBalance]);

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const convertToBaseUnits = (value: string): string => {
    try {
      const result = Number(value) * Math.pow(10, 12);
      return result.toString();
    } catch (error) {
      console.error("Error converting balance:", error);
      throw new Error("Invalid balance conversion");
    }
  };

  const onSubmit = async (values: BalanceFormValues) => {
    if (!connected || !isOnline) {
      toast("Please connect your wallet", {
        style: {
          background: "#DD2627",
          color: "white",
        },
        position: "top-center",
      });
      return;
    }

    try {
      const balanceInBaseUnits = convertToBaseUnits(values.balance);

      if (values.transactionType === "deposit") {
        // check if the market is concluded to avoid deposit

        const currentDate = new Date();
        const marketTimeUnixMs = selectedMarket?.MarketInfo?.Duration;
        const marketTimeUnixSeconds = Math.floor(
          Number(marketTimeUnixMs) / 1000
        );

        const validationResult = validateMarketTimeWithDetails(
          currentDate,
          Number(marketTimeUnixSeconds) || 0
        );

        if (!validationResult.isValid) {
          toast("Sorry! Market is already concluded", {
            style: {
              background: "#DD2627",
              color: "white",
            },
            position: "top-center",
          });
          return;
        }
        await depositMutate(balanceInBaseUnits);
      } else {
        await withdrawMutate(balanceInBaseUnits);
      }

      handleClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Transaction failed";
      toast(errorMessage, {
        style: {
          background: "#DD2627",
          color: "white",
        },
        position: "top-center",
      });
    }
  };

  const isSubmitDisabled = depositStatus || withdrawStatus;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start space-x-2 px-2"
          variant="ghost"
          {...props}
        >
          <Wallet size={22} />
          <span>Balance</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Balance</DialogTitle>
          <DialogDescription className="flex gap-2">
            <span>Current Balance:</span>
            <Badge>
              <span>
                {formatArweaveTokenAmount(balance?.UserDepositBalance || 0)}
              </span>
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              type="number"
              label="Balance"
              name="balance"
              placeholder="Enter Balance"
              step="0.000000000001"
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
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full"
              >
                {depositStatus || withdrawStatus
                  ? "Processing..."
                  : form.watch("transactionType") === "deposit"
                  ? "Deposit"
                  : "Withdraw"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
