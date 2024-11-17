/* eslint-disable react-hooks/exhaustive-deps */
import { useAccountStore } from "@/feature/user/store/account-store";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props extends PropsWithChildren {}

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { isOnline } = useAccountStore();
  const navigate = useNavigate();

  // Check if the user exist
  useEffect(() => {
    if (!isOnline) {
      navigate("/");
    }
  }, [isOnline]);

  return children;
};

export default ProtectedRoutes;
