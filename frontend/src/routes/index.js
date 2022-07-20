import {
  HOME_ROUTER,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  BOARD_ROUTE,
  BOARD_ID_ROUTE,
} from "../utils/consts";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Board from "../pages/Board";

export const authRoutes = [
  {
    path: BOARD_ROUTE,
    Component: Home,
  },
  {
    path: HOME_ROUTER,
    Component: Home,
  },
  {
    path: BOARD_ID_ROUTE,
    Component: Board,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTER_ROUTE,
    Component: Signup,
  },
];
