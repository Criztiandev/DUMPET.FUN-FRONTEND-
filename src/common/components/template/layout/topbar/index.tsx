import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/atoms/ui/avatar";
import { Button } from "@/common/components/atoms/ui/button";
import { XStack } from "@/common/components/atoms/ui/stack";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { useTheme } from "../../provider/theme-provider";
import { useConnection } from "arweave-wallet-kit";
import { ConnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";
import ProfileDropdownMenu from "@/common/components/molecules/menu/profile-menu";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "@/common/components/molecules/menu/mobile-menu";
import CreateButton from "@/common/components/atoms/button/create-button";

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

const Socials = () => {
  const { theme } = useTheme();
  return (
    <div className="flex gap-2">
      <Button size="icon" variant={theme === "light" ? "outline" : "default"}>
        <FacebookIcon size={22} />
      </Button>
      <Button size="icon" variant={theme === "light" ? "outline" : "default"}>
        <InstagramIcon size={22} />
      </Button>

      <Button size="icon" variant={theme === "light" ? "outline" : "default"}>
        <TwitterIcon size={22} />
      </Button>
    </div>
  );
};
