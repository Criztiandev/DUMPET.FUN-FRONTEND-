import { RouterProvider } from "react-router-dom";
import userRoutes from "./feature/user/user.routes";

const App = () => {
  const routes = userRoutes;

  console.log(import.meta.env.VITE_DEV_MAIN_PROCESS_ID);

  return <RouterProvider router={routes} />;
};

export default App;
