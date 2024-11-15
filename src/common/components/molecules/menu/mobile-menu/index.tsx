import { SocialsLinks } from "@/common/data/static/topbar-link";
import MenuDrawer from "../../drawer/menu-drawer";
import MobileMenuItems from "@/common/components/atoms/menu/mobile-menu-items";
import ThemeButton from "@/common/components/atoms/button/theme-button";
import { useConnection, useProfileModal } from "arweave-wallet-kit";
import { ConnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";
import ProfileButton from "@/common/components/atoms/button/profile-button";
import CreateButton from "@/common/components/atoms/button/create-button";
import { DrawerClose } from "@/common/components/atoms/ui/drawer";
import { useRef } from "react";
import { Button } from "@/common/components/atoms/ui/button";
import { Wallet } from "lucide-react";

const MobileMenu = () => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const profileModal = useProfileModal();
  const { connected } = useConnection();

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
      {connected && (
        <DrawerClose asChild>
          <CreateButton />
        </DrawerClose>
      )}
      {connected && (
        <DrawerClose asChild>
          <ProfileButton />
        </DrawerClose>
      )}

      {SocialsLinks.map((link) => (
        <MobileMenuItems {...link} key={link.title} />
      ))}
      <ThemeButton />

      <DrawerClose asChild>
        <Button
          className="w-full space-x-2"
          variant="ghost"
          onClick={toggleDrawer}
        >
          <Wallet size={22} />
          {connected ? <span>Logout</span> : <span>Connect Wallet</span>}
        </Button>
      </DrawerClose>

      <div ref={drawerRef} className="hidden">
        {connected ? (
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
