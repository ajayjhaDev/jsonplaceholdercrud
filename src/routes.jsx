import App from "./App";
import Route1 from "./pages/route1/Index";
import Route2 from "./pages/route2/Index";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/route1",
    element: <Route1 />,
  },
  {
    path: "/route2",
    element: <Route2 />,
  },
];

export default routes;
