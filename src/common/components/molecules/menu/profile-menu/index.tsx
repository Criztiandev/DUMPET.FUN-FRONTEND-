import { User, Wallet } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/common/components/atoms/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import useDisconnectWallet from "@/common/hooks/wallet/useDisconnectWallet";
import { useActiveAddress } from "arweave-wallet-kit";
import ButtonLoading from "@/common/components/page/helper/button-loading";
import { Suspense } from "react";
import CreateMarketStatusMenuSheet from "../../sheet/create-market-status-menu-sheet";

function ProfileDropdownMenu() {
  const address = useActiveAddress();
  const { mutate } = useDisconnectWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateAddress = () => {
    navigate(`/account`);
  };

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:border hover:dark:border-stone-200">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${address}&background=8058D5&color=fff`}
            alt="@shadcn"
          />
          <AvatarFallback>{address?.toString()[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="space-x-2"
            onClick={handleNavigateAddress}
          >
            <User size={22} />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          {!location.pathname.includes("/create") && (
            <Suspense fallback={<ButtonLoading className="w-full" />}>
              <CreateMarketStatusMenuSheet />
            </Suspense>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="space-x-2" onClick={() => mutate()}>
          <Wallet />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdownMenu;
