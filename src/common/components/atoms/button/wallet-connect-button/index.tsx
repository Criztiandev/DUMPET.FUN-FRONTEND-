import { PropsWithChildren } from "react";
import { Button, ButtonProps } from "../../ui/button";
import { cn } from "@/common/lib/utils";
import { useTheme } from "@/common/components/template/provider/theme-provider";
import { Wallet } from "lucide-react";
import useConnectWallet from "@/common/hooks/wallet/useConnectWallet";
import useDisconnectWallet from "@/common/hooks/wallet/useDisconnectWallet";

interface WalletButtonProps extends ButtonProps, PropsWithChildren {}

export const WalletButton = ({ children, ...props }: WalletButtonProps) => {
  const { theme } = useTheme();
  return (
    <Button
      {...props}
      className={cn(`space-x-2 w-full`)}
      variant={theme === "light" ? "default" : "default"}
    >
      <Wallet size={22} />
      <span>{children}</span>
    </Button>
  );
};

export const ConnectWalletButton = () => {
  const { mutate, isPending } = useConnectWallet();

  const onToggle = () => {
    mutate(); // Use the mutation instead of calling connect directly
  };

  return (
    <WalletButton onClick={onToggle} disabled={isPending}>
      Connect Wallet
    </WalletButton>
  );
};

export const DisconnectWalletButton = () => {
  const { mutate, isPending } = useDisconnectWallet();

  const onToggle = () => {
    mutate();
  };
  return (
    <WalletButton onClick={onToggle} disabled={isPending}>
      Disconnect Wallet
    </WalletButton>
  );
};
