import { Card, CardContent } from "@/common/components/atoms/ui/card";
import MarketActionDetails from "@/common/components/organism/market-action-details";
import { Suspense } from "react";
import { Skeleton } from "@/common/components/atoms/ui/skeleton";
import MarketActionControlls from "@/common/components/organism/market-action-controls";

const DesktopMarketAction = () => {
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
