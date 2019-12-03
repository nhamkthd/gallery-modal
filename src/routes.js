import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import routesMap from "./common/routesMap";

const Gallery = lazy(() => import("./components/home/Gallery"));
const Setting = lazy(() => import("./components/Settings"));
const Notification = lazy(() => import("./components/Notifications"));
const Login = lazy(() => import("./components/Login"));

const RedirectHome = () => {
  return <Redirect to={routesMap.gallery} />;
};

const routeStaff = () => {
  return [
    { path: "/", exact: true, name: "home", component: RedirectHome },
    {
      path: routesMap.gallery,
      name: "Gallery",
      component: Gallery
    },
    {
      path: routesMap.setting,
      name: "Setting",
      component: Setting
    },
    {
      path: routesMap.notification,
      name: "Notification",
      component: Notification
    },
    {
      path: routesMap.login,
      name: "Login",
      exact:true,
      component: Login
    }
  ];
};

const useRoutes = () => {
  return routeStaff();
};

export default useRoutes;
