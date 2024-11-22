import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/atoms/ui/avatar";
import { Button } from "@/common/components/atoms/ui/button";
import { XStack } from "@/common/components/atoms/ui/stack";

import { Send } from "lucide-react";
import { useConnection } from "arweave-wallet-kit";
import { ConnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";
import ProfileDropdownMenu from "@/common/components/molecules/menu/profile-menu";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "@/common/components/molecules/menu/mobile-menu";
import CreateButton from "@/common/components/atoms/button/create-button";
import { Tooltip, TooltipTrigger } from "@/common/components/atoms/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import FaqDialog from "@/common/components/molecules/dialog/faq-dialog";
import AirdropButton from "@/common/components/atoms/button/airdop-button";

const Topbar = () => {
  const isMobile = useIsMobile();
  const { connected } = useConnection();
  const location = useLocation();

  return (
    <header className=" absolute top-0 z-50 p-4 flex justify-between items-center  border-stone-50 w-full">
      <Link to="/">
        <XStack className="items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-bold items-center text-xl">DUMPET.FUN</div>
        </XStack>
      </Link>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <div className="flex gap-4 items-center">
          <Socials />
          {connected && !location.pathname.includes("/create/market") && (
            <CreateButton />
          )}
          {connected ? <ProfileDropdownMenu /> : <ConnectWalletButton />}
        </div>
      )}
    </header>
  );
};

export default Topbar;

// <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
const Socials = () => {
  return (
    <div className="flex gap-2">
      <FaqDialog />
      <AirdropButton />

      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant={"outline"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width={18}
              height={18}
              fill="white"
            >
              <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[12px]">Faceook</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant={"outline"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={18}
              height={18}
              fill="white"
            >
              <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[12px]">Tiktok</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant={"outline"}>
            <Send size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[12px]">Telegram</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant={"outline"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={18}
              height={18}
              fill="white"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[12px]">Twitter(X)</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
