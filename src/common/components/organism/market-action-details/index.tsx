import { XStack, YStack } from "@/common/components/atoms/ui/stack";
import { Wallet } from "lucide-react";
import { Suspense } from "react";
import { BalanceDialog } from "../../molecules/dialog/balance-dialog";
import { Skeleton } from "../../atoms/ui/skeleton";
import { buttonVariants } from "../../atoms/ui/button";
import useBalanceStore from "@/feature/user/store/balance-store";
import { formatArweaveTokenAmount } from "@/common/utils/format.utils";

const MarketActionDetails = () => {
  const { balance } = useBalanceStore();
  return (
    <div className="w-full">
      <YStack className="space-y-4 p-4">
        <div className="h-[300px] w-full border rounded-md overflow-hidden p-4 flex flex-col">
          <div className="h-full">
            <XStack className="flex justify-between items-center">
              <span className="flex space-x-2">
                <Wallet />
                <span>Current Balance</span>
              </span>

              <span>
                {formatArweaveTokenAmount(balance.UserDepositBalance)}
              </span>
            </XStack>
          </div>
        </div>

        <XStack className="justify-end ">
          <div>
            <Suspense
              fallback={
                <Skeleton
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start px-2 space-x-2",
                  })}
                >
                  <Wallet />
                  <span>Loading</span>
                </Skeleton>
              }
            >
              <BalanceDialog variant="default" />
            </Suspense>
          </div>
        </XStack>
      </YStack>
    </div>
  );
};

export default MarketActionDetails;
