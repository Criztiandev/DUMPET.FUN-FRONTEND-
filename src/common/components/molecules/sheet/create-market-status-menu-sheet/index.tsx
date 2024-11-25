import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/common/components/atoms/ui/sheet";
import { YStack } from "@/common/components/atoms/ui/stack";
import { Separator } from "@/common/components/atoms/ui/separator";
import { Card, CardHeader } from "@/common/components/atoms/ui/card";
import useFetchAllCreatedMarket from "@/feature/market/hooks/market/use-fetch-all-created-market";
import { useNavigate } from "react-router-dom";
import useFetchPendingMarket from "@/feature/market/hooks/market/use-fetch-pending-market";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Store } from "lucide-react";
import { ScrollArea } from "@/common/components/atoms/ui/scroll-area";
import { useAccountStore } from "@/feature/user/store/account-store";

const CreateMarketStatusMenuSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleNavigate = (marketId: string) => {
    setIsOpen(false);
    navigate(`/market/${marketId}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="flex space-x-3 px-2 py-2 cursor-pointer hover:bg-secondary rounded-[5px]">
          <Store size={22} />
          <span>My Markets</span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col h-full">
          <SheetHeader className="flex-none">
            <SheetTitle>Markets Status</SheetTitle>
            <SheetDescription>
              View all created market that is pending
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 -mx-6 px-6">
            <YStack className="my-4">
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

            <YStack className="mt-8">
              <h2 className="text-xl font-bold mb-2">Done</h2>
              <Separator />
              <div className="space-y-2 py-3">
                {createdMarket?.Markets?.map(
                  ({ MarketProcessId, Title }: any) => (
                    <Card
                      key={MarketProcessId}
                      className="bg-transparent border border-green-500 cursor-pointer"
                      onClick={() => handleNavigate(MarketProcessId)}
                    >
                      <CardHeader>
                        <h2 className="break-words">{Title}</h2>
                      </CardHeader>
                    </Card>
                  )
                )}
              </div>
            </YStack>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateMarketStatusMenuSheet;
