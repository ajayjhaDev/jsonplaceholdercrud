import App from "./App";
import AddTodo from "./pages/AddTodo/Index";
import EditTodo from "./pages/EditTodo/Index";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddTodo />,
  },
  {
    path: "/edit",
    element: <EditTodo />,
  },
];

export default routes;
