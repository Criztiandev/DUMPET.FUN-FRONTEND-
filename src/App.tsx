import { RouterProvider } from "react-router-dom";
import userRoutes from "./feature/user/user.routes";

const App = () => {
  const routes = userRoutes;
  return <RouterProvider router={routes} />;
};

export default App;
