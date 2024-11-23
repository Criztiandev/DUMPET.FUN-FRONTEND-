import { Tooltip, TooltipTrigger } from "@/common/components/atoms/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import FaqDialog from "@/common/components/molecules/dialog/faq-dialog";
import AirdropButton from "@/common/components/atoms/button/airdop-button";
import SocialElipsis from "../socials-elipsis";
import { useIsMobile } from "@/hooks/use-mobile";

const SecondHeader = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex justify-end">
      <Tooltip>
        <TooltipTrigger>
          <FaqDialog />
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[12px]">FAQ</span>
        </TooltipContent>
      </Tooltip>
      <AirdropButton />

      {!isMobile && <SocialElipsis />}
    </div>
  );
};

export default SecondHeader;
