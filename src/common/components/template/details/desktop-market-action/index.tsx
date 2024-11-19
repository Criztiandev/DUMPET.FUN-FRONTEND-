import { Card, CardContent } from "@/common/components/atoms/ui/card";
import { Flame, X } from "lucide-react";
import { XStack, YStack } from "@/common/components/atoms/ui/stack";
import { Button, buttonVariants } from "@/common/components/atoms/ui/button";
import SelectField from "@/common/components/atoms/form/SelectField";
import { Separator } from "@/common/components/atoms/ui/separator";
import InputField from "@/common/components/atoms/form/InputField";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/atoms/ui/tooltip";
import ImagePreview from "@/common/components/atoms/images/image-preview";
import { cn } from "@/common/lib/utils";
import { toast } from "sonner";

const DesktopMarketAction = () => {
  const handleVote = (value: string) => {
    toast(`Successfully Voted ${value}`, {
      position: "top-center",
      style: {
        background: "#38A068",
        color: "white",
      },
    });
  };

  const handleCancelVote = (value: string) => {
    toast(`Cancelled Voted ${value}`, {
      position: "top-center",
      style: {
        background: "#E43E3F",
        color: "white",
      },
    });
  };
  return (
    <div className="p-4">
      <Card className="h-full">
        <CardContent className="p-4 flex flex-col justify-between  h-full">
          <div className="w-full">
            <YStack className="space-y-4">
              <ImagePreview thumbnailFile="" />

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
                    <div className="grid grid-cols-[auto_25%_auto] gap-4 justify-items-center my-4">
                      <span className="flex gap-2 text-sm items-center">
                        <Flame />
                        Sample 1
                      </span>

                      <span
                        className={cn(buttonVariants({ variant: "outline" }))}
                      >
                        VS
                      </span>

                      <span className="flex gap-2 text-sm items-center">
                        <Flame />
                        Sample 2
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </YStack>

            <div className="my-4">
              <Separator />
            </div>
          </div>

          {/* Action */}
          <div>
            <div className="space-y-4">
              <SelectField
                label="Selection"
                name="selection"
                placeholder="Select your preference"
                options={[{ value: "Option A", label: "Option A" }]}
              />

              <div className="grid grid-cols-[auto_30%] gap-4 items-center">
                <InputField
                  type="number"
                  name="ammount"
                  placeholder="Ammount"
                />
                <SelectField
                  name="token"
                  placeholder="Deposit"
                  options={[
                    { label: "Deposit", value: "Deposit" },
                    { label: "Withdraw", value: "withdraw" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-[auto_10%] gap-2">
                <Button
                  className="w-full bg-primary"
                  onClick={() => handleVote("Option A")}
                >
                  Place Bet
                </Button>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleCancelVote("Option A")}
                    >
                      <X />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Cancel Vote</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopMarketAction;
