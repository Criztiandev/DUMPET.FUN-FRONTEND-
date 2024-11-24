import { XStack } from "@/common/components/atoms/ui/stack";

import ProfileDropdownMenu from "@/common/components/molecules/menu/profile-menu";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "@/common/components/molecules/menu/mobile-menu";
import CreateMarketStatusSheet from "@/common/components/molecules/sheet/create-market-status-sheet";
import { Suspense } from "react";
import { useAccountStore } from "@/feature/user/store/account-store";
import ButtonLoading from "@/common/components/page/helper/button-loading";
import CreateMarketFAQ from "@/common/components/molecules/dialog/create-market-faq";

const CreateMarketTopbar = () => {
  const isMobile = useIsMobile();
  const { isOnline } = useAccountStore();

  return (
    <header className="absolute top-0 left-0 p-4 flex justify-between items-center  border-stone-50 w-full">
      <Link to="/">
        <XStack className="items-center gap-4">
          <div className="font-bold items-center text-3xl">DUMPET.FUN</div>
        </XStack>
      </Link>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <div className="flex gap-4 items-center">
          <CreateMarketFAQ />
          <Suspense fallback={<ButtonLoading />}>
            <CreateMarketStatusSheet />
          </Suspense>
          {isOnline && <ProfileDropdownMenu />}
        </div>
      )}
    </header>
  );
};

export default CreateMarketTopbar;
