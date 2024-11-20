import { XStack, YStack } from "@/common/components/atoms/ui/stack";
import { Wallet } from "lucide-react";

const MarketActionDetails = () => {
  return (
    <div className="w-full">
      <YStack className="space-y-4 p-4">
        <XStack className="flex justify-between items-center">
          <span className="flex space-x-2">
            <Wallet />
            <span>Deposit</span>
          </span>

          <span>0</span>
        </XStack>

        <XStack className="flex justify-between items-center">
          <span className="flex space-x-2">
            <Wallet />
            <span>Withdraw</span>
          </span>

          <span>0</span>
        </XStack>
      </YStack>
    </div>
  );
};

export default MarketActionDetails;
