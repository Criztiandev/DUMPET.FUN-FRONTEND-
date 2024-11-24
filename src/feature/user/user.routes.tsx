import { createHashRouter } from "react-router-dom";
import MainScreen from "./pages/main-screen";
import NotFoundScreen from "@/common/components/page/helper/no-found";
import DetailsScreen from "./pages/details-screen";
import ProfileScreen from "./pages/profile-screen";
import CreateBetScreen from "./pages/create-market-screen";
import ProtectedRoutes from "@/common/components/template/hoc/ProtectedRoutes";
import PublicProfileScreen from "./pages/public-profile-screen";

const routes = [
  { path: "*", element: <NotFoundScreen /> },
  {
    path: "/",
    element: <MainScreen />,
  },

  {
    path: "/home",
    element: <MainScreen />,
  },

  {
    path: "/account",
    element: (
      <ProtectedRoutes>
        <ProfileScreen />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/profile/:id",
    element: <PublicProfileScreen />,
  },
  {
    path: "/market/:id",
    element: <DetailsScreen />,
  },
  {
    path: "/create/market",
    element: <CreateBetScreen />,
  },
];

const userRoutes = createHashRouter(routes);

export default userRoutes;
