import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "containers/Home";
import Bakers from "containers/Bakers";
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
        path: "/bakers",
        element: <Bakers />,
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
