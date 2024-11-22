import useConnectWallet from "@/common/hooks/wallet/useConnectWallet";
import { useAccountStore } from "@/feature/user/store/account-store";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface Props extends PropsWithChildren {}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { isOnline } = useAccountStore();
  const navigate: NavigateFunction = useNavigate();
  const { mutate } = useConnectWallet();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isOnline) {
          // Try different navigation approaches
          await navigate("/", {
            replace: true,
            relative: "route",
          });

          mutate();
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };

    checkAuth();
  }, [isOnline, navigate]);

  // Add a loading state while checking
  if (!isOnline) {
    return null; // or return a loading spinner
  }

  return children;
};

export default ProtectedRoutes;
