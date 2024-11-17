import { Button } from "../../ui/button";
import { Wallet } from "lucide-react";
import { useProfileModal } from "arweave-wallet-kit";

const LogoutButton = () => {
  return (
    <Button className="w-full justify-start space-x-3 px-2" variant="ghost">
      <Wallet size={22} />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
