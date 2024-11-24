import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/common/components/atoms/ui/tooltip";
import { Button } from "../../ui/button";
import { Gift } from "lucide-react";
import useClaimAirDrop from "@/feature/balance/hooks/use-claim-airdrop";

const AirdropButton = () => {
  const { mutate } = useClaimAirDrop();
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="mr-4"
          onClick={() => mutate()}
        >
          <Gift />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-transparent">
        <span className="text-[12px]">Claim Airdrop</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default AirdropButton;
