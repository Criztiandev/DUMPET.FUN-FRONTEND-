import { SocialsLinks } from "@/common/data/static/topbar-link";
import MenuDrawer from "../../drawer/menu-drawer";
import MobileMenuItems from "@/common/components/atoms/menu/mobile-menu-items";
import ThemeButton from "@/common/components/atoms/button/theme-button";
import { useConnection } from "arweave-wallet-kit";
import { ConnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";
import ProfileButton from "@/common/components/atoms/button/profile-button";
import LogoutDrawer from "../../drawer/logout-drawer";
import CreateButton from "@/common/components/atoms/button/create-button";

const MobileMenu = () => {
  const { connected } = useConnection();
  return (
    <MenuDrawer className="px-4 pb-2 space-y-2">
      {connected && <CreateButton />}
      {connected && <ProfileButton />}

      {SocialsLinks.map((link) => (
        <MobileMenuItems {...link} />
      ))}
      <ThemeButton />
      {connected ? <LogoutDrawer /> : <ConnectWalletButton />}
    </MenuDrawer>
  );
};

export default MobileMenu;
