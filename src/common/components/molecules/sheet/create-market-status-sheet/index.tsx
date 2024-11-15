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
import useFetchCreatedMarkets from "@/feature/market/hooks/market/use-fetch-created-market";

const CreateMarketStatusSheet = () => {
  const sheet = useFetchCreatedMarkets();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Markets</Button>
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

              <Card className="bg-transparent">
                <CardHeader>
                  <h2>TIasdfsdfsfsfsfsf</h2>
                </CardHeader>
              </Card>
            </YStack>

            <YStack className="my-4">
              <h2 className="text-xl font-bold mb-2">Done</h2>
              <Separator />
            </YStack>
          </div>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button >Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default CreateMarketStatusSheet;
