import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "containers/Home";
import Rankings from "containers/Rankings";
import Bets from "containers/Bets";
import Episodes from "containers/Episodes";
import Admin from "containers/Admin";
import Login from "containers/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rankings",
        element: <Rankings />,
      },
      {
        path: "/bets",
        element: <Bets />,
      },
      {
        path: "/episodes",
        element: <Episodes />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

// {
//   path: "/room/:roomId",
//   element: <Room />,
// },
