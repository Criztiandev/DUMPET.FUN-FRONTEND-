import {
  Facebook,
  User,
  TwitterIcon,
  InstagramIcon,
  Plane,
} from "lucide-react";

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
import LogoutDrawer from "../../drawer/logout-drawer";

function ProfileDropdownMenu() {
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

        <DropdownMenuSeparator />
        <DropdownMenuItem className="space-x-2">
          <Facebook size={22} />
          <span>Facebook</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="space-x-2">
          <TwitterIcon size={22} />
          <span>X</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="space-x-2">
          <InstagramIcon size={22} />
          <span>Instagram</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="space-x-2">
          <Plane size={22} />
          <span>Telegram</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <LogoutDrawer />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdownMenu;
