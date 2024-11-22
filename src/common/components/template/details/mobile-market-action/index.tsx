import SelectField from "@/common/components/atoms/form/SelectField";
import InputField from "@/common/components/atoms/form/InputField";
import { Separator } from "@/common/components/atoms/ui/separator";
import { Button } from "@/common/components/atoms/ui/button";
import ImagePreview from "@/common/components/atoms/images/image-preview";
import { XStack, YStack } from "@/common/components/atoms/ui/stack";
import { Clock, Flame } from "lucide-react";
import { Badge } from "@/common/components/atoms/ui/badge";

const MobileMarketDetails = () => {
  return (
    <YStack>
      <div className="px-4">
        {/* Action Form */}
        <div className="py-4">
          <div className="space-y-4">
            <SelectField
              label="Selection"
              name="selection"
              placeholder="Select your preference"
              options={[{ value: "Option A", label: "Option A" }]}
            />

            <Separator />

            <Button className="w-full bg-primary">Conclude</Button>
          </div>
          <div className="fixed bottom-0 left-0 bg-pr w-full p-4 space-y-4 bg-background">
            <div className="grid grid-cols-[auto_30%] gap-4 items-center">
              <InputField type="number" name="ammount" placeholder="Ammount" />
              <SelectField
                name="token"
                placeholder="Deposit"
                options={[
                  { label: "Deposit", value: "Deposit" },
                  { label: "Withdraw", value: "withdraw" },
                ]}
              />
            </div>

            <Button className="w-full bg-primary">Place Bet</Button>
            <Button className="w-full" variant="destructive">
              Cancel Bet
            </Button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 mb-36">
        <ImagePreview />

        <div className="space-y-4 mt-4">
          <div className="mb-4">
            <h3 className="font-bold text-lg capitalize">Dumpet card</h3>
            <XStack className="gap-2">
              <span className="text-sm ">Created by</span>
              <span className="text-purple-400  text-sm">Criztian</span>
            </XStack>
          </div>

          <div className="flex flex-col">
            <span className="flex flex-col gap-2  ">
              <span className="flex gap-2 text-sm items-center">
                <Flame />
                Sample 1
              </span>
              <span className="flex gap-2 text-sm items-center">
                <Flame />
                Sample 2
              </span>

              <Separator />

              <span className="flex gap-2 text-sm items-center">
                <Clock />3 minutes
              </span>
            </span>
            <div className="flex justify-start items-start my-4 flex-col space-y-2">
              <Badge className="space-x-2">
                <span>3 days ago</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </YStack>
  );
};

export default MobileMarketDetails;
