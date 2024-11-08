import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/atoms/ui/avatar";
import { Button } from "@/common/components/atoms/ui/button";
import { XStack } from "@/common/components/atoms/ui/stack";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { useTheme } from "../../provider/theme-provider";
import ThemeButton from "@/common/components/atoms/button/theme-button";
import { useConnection } from "arweave-wallet-kit";
import { ConnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";
import ProfileDropdownMenu from "@/common/components/molecules/menu/profile-menu";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { theme } = useTheme();
  const { connected } = useConnection();
  return (
    <header className="p-4 flex justify-between items-center">
      <Link to="/">
        <XStack className="items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-bold items-center text-xl">DUMPET.FUN</div>
        </XStack>
      </Link>
      <div className="flex gap-4">
        <div className="space-x-2">
          {!connected && (
            <>
              <Button
                size="icon"
                variant={theme === "light" ? "outline" : "default"}
              >
                <FacebookIcon size={22} />
              </Button>
              <Button
                size="icon"
                variant={theme === "light" ? "outline" : "default"}
              >
                <InstagramIcon size={22} />
              </Button>

              <Button
                size="icon"
                variant={theme === "light" ? "outline" : "default"}
              >
                <TwitterIcon size={22} />
              </Button>
            </>
          )}
          <ThemeButton />
        </div>
        {connected ? <ProfileDropdownMenu /> : <ConnectWalletButton />}
      </div>
    </header>
  );
};

export default Topbar;
