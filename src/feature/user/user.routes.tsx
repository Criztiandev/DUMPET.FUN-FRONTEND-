import { createBrowserRouter, createHashRouter } from "react-router-dom";
import MainScreen from "./pages/main-screen";
import NotFoundScreen from "@/common/components/page/helper/no-found";
import DetailsScreen from "./pages/details-screen";
import ProfileScreen from "./pages/profile-screen";
import CreateBetScreen from "./pages/create-market-screen";
import ProtectedRoutes from "@/common/components/template/hoc/ProtectedRoutes";

const routes = [
  { path: "*", element: <NotFoundScreen /> },
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: "/market/details/:id",
    element: (
      <ProtectedRoutes>
        <DetailsScreen />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <ProfileScreen />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/create/market",
    element: (
      <ProtectedRoutes>
        <CreateBetScreen />
      </ProtectedRoutes>
    ),
  },
];

const userRoutes =
  import.meta.env.VITE_DEV_ENVIRONMENT === "development"
    ? createBrowserRouter(routes)
    : createHashRouter(routes);

export default userRoutes;
