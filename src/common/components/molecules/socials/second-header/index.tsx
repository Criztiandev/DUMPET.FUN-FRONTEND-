import { Tooltip, TooltipTrigger } from "@/common/components/atoms/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import FaqDialog from "@/common/components/molecules/dialog/faq-dialog";
import AirdropButton from "@/common/components/atoms/button/airdop-button";
import SocialElipsis from "../socials-elipsis";

const SecondHeader = () => {
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

      <SocialElipsis />
    </div>
  );
};

export default SecondHeader;
