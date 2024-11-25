import { useTheme } from "@/common/components/template/provider/theme-provider";
import { useEffect } from "react";

import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainScreen from "./feature/user/pages/main-screen";
import ProtectedRoutes from "./common/components/template/hoc/ProtectedRoutes";
import ProfileScreen from "./feature/user/pages/profile-screen";
import PublicProfileScreen from "./feature/user/pages/public-profile-screen";
import DetailsScreen from "./feature/user/pages/details-screen";
import CreateMarketScreen from "./feature/user/pages/create-market-screen";

const App = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<MainScreen />} />
        <Route path={"/home"} element={<MainScreen />} />
        <Route
          path={"/account"}
          element={
            <ProtectedRoutes>
              <ProfileScreen />
            </ProtectedRoutes>
          }
        />
        <Route path={"/profile/:id"} element={<PublicProfileScreen />} />
        <Route path={"/market/:id"} element={<DetailsScreen />} />
        <Route path={"/create/market"} element={<CreateMarketScreen />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
