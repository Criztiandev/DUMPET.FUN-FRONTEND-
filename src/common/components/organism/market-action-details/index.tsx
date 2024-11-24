import { XStack, YStack } from "@/common/components/atoms/ui/stack";
import { Wallet } from "lucide-react";
import { Suspense } from "react";
import { BalanceDialog } from "../../molecules/dialog/balance-dialog";

import useBalanceStore from "@/feature/user/store/balance-store";
import { formatArweaveTokenAmount } from "@/common/utils/format.utils";
import ButtonLoading from "../../page/helper/button-loading";
import ShareTwitterButton from "../../atoms/button/share-twitter-button";
import useMarketStore from "@/feature/market/store/market.store";

const MarketActionDetails = () => {
  const { balance } = useBalanceStore();
  const { selectedMarket } = useMarketStore();
  return (
    <div className="w-full">
      <YStack className="space-y-4 p-4">
        <div className="w-full border rounded-md overflow-hidden p-4 flex flex-col">
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

        <XStack className="flex justify-end items-center">
          <XStack className="flex justify-end items-center gap-4">
            <div>
              <ShareTwitterButton
                processID={String(selectedMarket?.MarketInfo.ProcessId) || ""}
              />
            </div>
            <Suspense fallback={<ButtonLoading />}>
              <BalanceDialog variant="default" />
            </Suspense>
          </XStack>
        </XStack>
      </YStack>
    </div>
  );
};

export default MarketActionDetails;
