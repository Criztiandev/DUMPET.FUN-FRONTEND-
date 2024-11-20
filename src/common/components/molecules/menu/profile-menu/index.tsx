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
import { useNavigate } from "react-router-dom";
import useDisconnectWallet from "@/common/hooks/wallet/useDisconnectWallet";
import { BalanceDialog } from "../../dialog/balance-dialog";
import { Suspense } from "react";
import { Skeleton } from "@/common/components/atoms/ui/skeleton";
import { buttonVariants } from "@/common/components/atoms/ui/button";

function ProfileDropdownMenu() {
  const { mutate } = useDisconnectWallet();
  const navigate = useNavigate();

  const handleNavigateAddress = () => {
    navigate(`/profile`);
  };

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:border hover:dark:border-stone-200">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
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
        </DropdownMenuGroup>

        <Suspense
          fallback={
            <Skeleton
              className={buttonVariants({
                variant: "ghost",
                className: "w-full justify-start px-2 space-x-2",
              })}
            >
              <Wallet />
              <span>Loading</span>
            </Skeleton>
          }
        >
          <BalanceDialog />
        </Suspense>

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
