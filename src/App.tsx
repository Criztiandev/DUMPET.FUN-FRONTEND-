import { RouterProvider } from "react-router-dom";
import userRoutes from "./feature/user/user.routes";
import { useTheme } from "@/common/components/template/provider/theme-provider";
import { useEffect } from "react";

const App = () => {
  const { setTheme } = useTheme();
  const routes = userRoutes;

  useEffect(() => {
    setTheme("dark");
  }, []);

  return <RouterProvider router={routes} />;
};

export default App;
