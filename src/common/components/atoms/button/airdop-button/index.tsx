import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/common/components/atoms/ui/tooltip";
import { Button } from "../../ui/button";
import { Gift } from "lucide-react";
import { useTheme } from "@/common/components/template/provider/theme-provider";
import useClaimAirDrop from "@/feature/balance/hooks/use-claim-airdrop";

const AirdropButton = () => {
  const { theme } = useTheme();
  const { mutate } = useClaimAirDrop();
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon"
          variant={theme === "light" ? "outline" : "default"}
          className="mr-4"
          onClick={() => mutate()}
        >
          <Gift />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-[12px]">Claim Airdrop</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default AirdropButton;
