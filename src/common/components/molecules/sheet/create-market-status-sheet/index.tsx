import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/common/components/atoms/ui/sheet";
import { Button } from "@/common/components/atoms/ui/button";
import { YStack } from "@/common/components/atoms/ui/stack";
import { Separator } from "@/common/components/atoms/ui/separator";
import { Card, CardHeader } from "@/common/components/atoms/ui/card";
// import useFetchMarketStatus from "@/feature/market/hooks/market/use-fetch-market-status";
import useFetchAllCreatedMarket from "@/feature/market/hooks/market/use-fetch-all-created-market";
import { useNavigate } from "react-router-dom";
import useFetchPendingMarket from "@/feature/market/hooks/market/use-fetch-pending-market";
import { Badge } from "@/common/components/atoms/ui/badge";

const CreateMarketStatusSheet = () => {
  // const { data: marketStatus } = useFetchMarketStatus();
  const { data: createdMarket } = useFetchAllCreatedMarket();
  const { data: pendingMarket } = useFetchPendingMarket();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          {pendingMarket?.HasWaitFor && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full p-0 flex justify-center items-center"
            >
              1
            </Badge>
          )}
          <span>Market</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Markets Status</SheetTitle>
          <SheetDescription>
            View all created market that is pending
          </SheetDescription>
        </SheetHeader>
        <div className="">
          <div>
            <YStack>
              <YStack className="my-4">
                <h2 className="text-xl font-bold mb-2">Pending</h2>
                <Separator />
              </YStack>

              {pendingMarket?.HasWaitFor ? (
                <Card className="bg-transparent">
                  <CardHeader>
                    <h2>Creating your Market, Please wait</h2>
                  </CardHeader>
                </Card>
              ) : (
                <Card className="bg-transparent">
                  <CardHeader>
                    <h2>No Pending Market</h2>
                  </CardHeader>
                </Card>
              )}
            </YStack>

            <YStack className="my-4">
              <h2 className="text-xl font-bold mb-2">Done</h2>
              <Separator />

              <div className="space-y-2 py-3">
                {createdMarket &&
                  createdMarket?.Markets?.map(
                    ({ MarketProcessId, Title }: any) => (
                      <Card
                        className="bg-transparent border border-green-500 cursor-pointer "
                        onClick={() =>
                          navigate(`/market/details/${MarketProcessId}`)
                        }
                      >
                        <CardHeader>
                          <h2 className="break-words">{Title}</h2>
                        </CardHeader>
                      </Card>
                    )
                  )}
              </div>
            </YStack>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateMarketStatusSheet;
