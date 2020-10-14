import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layout/AuthLayout";
import Timetable from "../pages/Timetable";
export default [
  {
    path: "/load",
    exact: true,
    layout: MainLayout,
    component: Home,
  },
  {
    path: "/",
    exact: true,
    layout: MainLayout,
    component: Timetable,
  },

  {
    path: "/register",
    exact: true,
    layout: MainLayout,
    component: Register,
  },
  {
    path: "/login",
    exact: true,
    layout: MainLayout,
    component: Login,
  },
];
