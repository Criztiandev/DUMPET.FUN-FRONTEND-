import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/atoms/ui/avatar";
import { XStack } from "@/common/components/atoms/ui/stack";

import ThemeButton from "@/common/components/atoms/button/theme-button";
import ProfileDropdownMenu from "@/common/components/molecules/menu/profile-menu";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "@/common/components/molecules/menu/mobile-menu";
import CreateMarketStatusSheet from "@/common/components/molecules/sheet/create-market-status-sheet";
import { Suspense } from "react";
import { Skeleton } from "@/common/components/atoms/ui/skeleton";
import { cn } from "@/common/lib/utils";
import { buttonVariants } from "@/common/components/atoms/ui/button";

const CreateMarketTopbar = () => {
  const isMobile = useIsMobile();

  return (
    <header className="p-4 flex justify-between items-center  border-stone-50 w-full mb-18">
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
          <Suspense
            fallback={
              <Skeleton
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-[100px]"
                )}
              />
            }
          >
            <CreateMarketStatusSheet />
          </Suspense>
          <ProfileDropdownMenu />
          <ThemeButton />
        </div>
      )}
    </header>
  );
};

export default CreateMarketTopbar;
