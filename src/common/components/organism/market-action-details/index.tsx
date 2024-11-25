import { XStack, YStack } from "@/common/components/atoms/ui/stack";
import { Clock, Flame, Wallet } from "lucide-react";
import { Suspense } from "react";
import { BalanceDialog } from "../../molecules/dialog/balance-dialog";

import useBalanceStore from "@/feature/user/store/balance-store";
import { formatArweaveTokenAmount } from "@/common/utils/format.utils";
import ButtonLoading from "../../page/helper/button-loading";
import ShareTwitterButton from "../../atoms/button/share-twitter-button";
import useMarketStore from "@/feature/market/store/market.store";
import { Card, CardContent } from "../../atoms/ui/card";
import { Badge } from "../../atoms/ui/badge";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import TokenList from "@/feature/balance/data/token-list";
import { Link } from "react-router-dom";

const MarketActionDetails = () => {
  const { balance } = useBalanceStore();
  const { selectedMarket } = useMarketStore();

  const { Title, Creator, Concluded, OptionA, OptionB, TokenTxId } =
    (selectedMarket?.MarketInfo as MarketInfo) || {};

  const token = TokenList.find((token) => token.value === TokenTxId);

  return (
    <div className="w-full">
      <YStack className="space-y-4 p-4">
        <Card className="relative flex flex-col cursor-default border-primary/50 dark:bg-transparent min-h-[300px] h-full justify-between ">
          <CardContent className="p-4 flex flex-col justify-center space-y-4">
            <YStack>
              <div className="text-3xl font-bold">
                {Title?.length > 25
                  ? `${Title.substring(0, 30)}...`
                  : Title || "Thonald Dump"}
              </div>
              <div className="space-x-1">
                <span className="text-sm text-stone-600">Created By:</span>
                <Link
                  to={`/profile/${Creator}`}
                  target="_blank"
                  className="text-stone-600 text-sm hover:underline hover:underline-offset-4 hover:text-primary/70"
                >
                  <span className="text-sm ">{Creator}</span>
                </Link>
              </div>
            </YStack>

            <XStack className="justify-between items-center px-2 border p-4 rounded-md bg-secondary py-6">
              <span className="flex gap-2 text-sm items-center">
                <Flame fill="#dc2626" color="#dc2626" />
                {OptionA?.length > 15
                  ? `${OptionA?.substring(0, 15)}..`
                  : OptionA || "Option A"}
              </span>

              <Badge>VS</Badge>

              <span className="flex gap-2 text-sm items-center">
                <Flame fill="#2563eb" color="#2563eb" />
                {OptionB?.length > 15
                  ? `${OptionB?.substring(0, 15)}..`
                  : OptionB || "Option B"}
              </span>
            </XStack>

            <div className="flex gap-2 items-center">
              <Clock size={18} />
              <div className="space-x-2">
                <span>Token:</span>
                <Badge>{token?.label || "No Token"}</Badge>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Clock size={18} />
              <div className="space-x-2">
                <span>Status:</span>
                <Badge>{Concluded ? "Ended" : "Active"}</Badge>
              </div>
            </div>
          </CardContent>

          {/* <div className="absolute top-0 right-0 p-4">
          <Badge>{token?.label || "No Token"}</Badge>
        </div> */}
        </Card>

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
