import { SocialsLinks } from "@/common/data/static/topbar-link";
import MenuDrawer from "../../drawer/menu-drawer";
import MobileMenuItems from "@/common/components/atoms/menu/mobile-menu-items";
import { useProfileModal } from "arweave-wallet-kit";
import { ConnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";
import ProfileButton from "@/common/components/atoms/button/profile-button";
import CreateButton from "@/common/components/atoms/button/create-button";
import { DrawerClose } from "@/common/components/atoms/ui/drawer";
import { useRef } from "react";
import { Button } from "@/common/components/atoms/ui/button";
import { Wallet } from "lucide-react";
import { useAccountStore } from "@/feature/user/store/account-store";
import { useLocation } from "react-router-dom";
import MarketStatusButton from "@/common/components/atoms/button/market-status-button";

const MobileMenu = () => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const profileModal = useProfileModal();

  const url = useLocation();
  const { isOnline } = useAccountStore();

  const toggleDrawer = () => {
    if (drawerRef.current) {
      const drawerCloseButton = drawerRef.current
        .children[0] as HTMLButtonElement;
      if (drawerCloseButton) {
        drawerCloseButton.click();
      }
    }
  };

  return (
    <MenuDrawer className="px-4 pb-2 space-y-2">
      {isOnline && !url.pathname.includes("/create") && (
        <DrawerClose asChild>
          <CreateButton />
        </DrawerClose>
      )}
      {isOnline && (
        <>
          <DrawerClose asChild>
            <ProfileButton />
          </DrawerClose>

          <DrawerClose asChild>
            <MarketStatusButton />
          </DrawerClose>
        </>
      )}

      {isOnline && <DrawerClose asChild></DrawerClose>}

      {SocialsLinks.map((link) => (
        <MobileMenuItems {...link} key={link.title} />
      ))}

      <DrawerClose asChild>
        <Button
          className="w-full space-x-2"
          variant="ghost"
          onClick={toggleDrawer}
        >
          <Wallet size={22} />
          {isOnline ? <span>Logout</span> : <span>Connect Wallet</span>}
        </Button>
      </DrawerClose>

      <div ref={drawerRef} className="hidden">
        {isOnline ? (
          <Button
            className="w-full space-x-2"
            variant="ghost"
            onClick={() => profileModal.setOpen(true)}
          >
            <Wallet size={22} />
            Logout
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </div>
    </MenuDrawer>
  );
};

export default MobileMenu;
