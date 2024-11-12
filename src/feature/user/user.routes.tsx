import { createBrowserRouter, createHashRouter } from "react-router-dom";
import MainScreen from "./pages/main-screen";
import NotFoundScreen from "@/common/components/page/helper/no-found";
import DetailsScreen from "./pages/details-screen";
import ProfileScreen from "./pages/profile-screen";
import CreateBetScreen from "./pages/create-bet-screen";

const routes = [
  { path: "*", element: <NotFoundScreen /> },
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: "/details/:id",
    element: <DetailsScreen />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
  },
  {
    path: "/create/bet",
    element: <CreateBetScreen />,
  },
];

const userRoutes =
  import.meta.env.VITE_DEV_ENVIRONMENT === "development"
    ? createBrowserRouter(routes)
    : createHashRouter(routes);

export default userRoutes;
