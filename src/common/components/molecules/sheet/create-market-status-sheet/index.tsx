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
import useFetchAllCreatedMarket from "@/feature/market/hooks/market/use-fetch-all-created-market";
import { useNavigate } from "react-router-dom";
import useFetchPendingMarket from "@/feature/market/hooks/market/use-fetch-pending-market";
import { Badge } from "@/common/components/atoms/ui/badge";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/common/components/atoms/ui/scroll-area";
import { useAccountStore } from "@/feature/user/store/account-store";

const CreateMarketStatusSheet = () => {
  const { address } = useAccountStore();
  const { data: createdMarket } = useFetchAllCreatedMarket(address);
  const { data: pendingMarket } = useFetchPendingMarket();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [`/GET /market/status/pending`],
    });
  }, [pendingMarket]);

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
          <span>My Market</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Markets Status</SheetTitle>
            <SheetDescription>
              View all created market that is pending
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 flex flex-col min-h-0">
            <YStack className="flex-none my-4">
              <h2 className="text-xl font-bold mb-2">Pending</h2>
              <Separator />
              {pendingMarket?.HasWaitFor ? (
                <Card className="bg-transparent mt-2">
                  <CardHeader>
                    <h2>Creating your Market, Please wait</h2>
                  </CardHeader>
                </Card>
              ) : (
                <Card className="bg-transparent mt-2">
                  <CardHeader>
                    <h2>No Pending Market</h2>
                  </CardHeader>
                </Card>
              )}
            </YStack>

            <YStack className="flex-1 min-h-0">
              <h2 className="text-xl font-bold mb-2">Done</h2>
              <Separator className="mb-3" />

              <ScrollArea className="h-full">
                <div className="space-y-2 pr-4">
                  {createdMarket?.Markets?.map(
                    ({ MarketProcessId, Title }: any) => (
                      <Card
                        key={MarketProcessId}
                        className="bg-transparent border border-green-500 cursor-pointer"
                        onClick={() => navigate(`/market/${MarketProcessId}`)}
                      >
                        <CardHeader>
                          <h2 className="break-words">{Title}</h2>
                        </CardHeader>
                      </Card>
                    )
                  )}
                </div>
              </ScrollArea>
            </YStack>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateMarketStatusSheet;
