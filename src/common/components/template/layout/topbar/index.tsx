import { XStack } from "@/common/components/atoms/ui/stack";

import { useConnection } from "arweave-wallet-kit";
import { ConnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";
import ProfileDropdownMenu from "@/common/components/molecules/menu/profile-menu";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "@/common/components/molecules/menu/mobile-menu";
import CreateButton from "@/common/components/atoms/button/create-button";
import SecondHeader from "@/common/components/molecules/socials/second-header";
import VotingMarketFaq from "@/common/components/molecules/dialog/betting-market-faq";

const Topbar = () => {
  const isMobile = useIsMobile();
  const { connected } = useConnection();
  const location = useLocation();

  return (
    <div className="w-full space-y-6 absolute top-0 z-50 p-4">
      <header className=" flex justify-between items-center  border-stone-50 w-full">
        <Link to="/">
          <XStack className="items-center gap-4">
            <div className="font-bold items-center text-3xl">DUMPET.FUN</div>
          </XStack>
        </Link>
        {isMobile ? (
          <MobileMenu />
        ) : (
          <div className="space-y-4">
            <div className="flex gap-4 items-cente justify-end">
              <div className="space-x-4">
                {location.pathname.includes("/market") && <VotingMarketFaq />}
                {!location.pathname.includes("/create/market") && (
                  <CreateButton />
                )}
              </div>
              <div>
                {connected ? <ProfileDropdownMenu /> : <ConnectWalletButton />}
              </div>
            </div>
          </div>
        )}
      </header>

      {!location.pathname.includes("market") && <SecondHeader />}
    </div>
  );
};

export default Topbar;
