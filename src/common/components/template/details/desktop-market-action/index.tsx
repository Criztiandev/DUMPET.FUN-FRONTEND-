import { Card, CardContent } from "@/common/components/atoms/ui/card";
import MarketActionDetails from "@/common/components/organism/market-action-details";
import { Suspense, useEffect } from "react";
import { Skeleton } from "@/common/components/atoms/ui/skeleton";
import MarketActionControlls from "@/common/components/organism/market-action-controls";
import useFetchAccountBalance from "@/feature/balance/hooks/use-fetch-account-balance";
import useBalanceStore from "@/feature/user/store/balance-store";
import MarketActionLoadingScreen from "@/common/components/page/helper/market-action-loading-screen";

const DesktopMarketAction = () => {
  const { setBalance } = useBalanceStore();
  const { data: balanceResult, isLoading } = useFetchAccountBalance();

  useEffect(() => {
    if (balanceResult) {
      setBalance(balanceResult);
    }
  }, [balanceResult]);

  if (isLoading) return <MarketActionLoadingScreen />;

  return (
    <div className="p-4">
      <Card className="h-full">
        <CardContent className="p-4 flex flex-col justify-between  h-full">
          <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
            <MarketActionDetails />
          </Suspense>

          {/* Action */}
          <MarketActionControlls />
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopMarketAction;
