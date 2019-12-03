import React, { useState, Suspense, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";
import MainMenu from "./MainMenu";
import history from "../../common/history";
import useRoutes from "../../routes";
import useUserLogin from "../../hooks/useUserLogin";
import routesMap from "../../common/routesMap";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { actionLogout, actionClearState } from "../../redux/user/action";
import useEvent from "../../hooks/useEvent";
import { LOGOUT_SUCCESS } from "../../redux/user/types";

const DEVICE_TYPE_DESKTOP = "DEVICE_TYPE_DESKTOP";
const DEVICE_TYPE_MOBILE_IOS = "DEVICE_TYPE_MOBILE_IOS";
const DEVICE_TYPE_MOBILE_ANDROID = "DEVICE_TYPE_MOBILE_ANDROID";

export default function Defaultlayout() {
  const dispatch = useDispatch();
  const userLogin = useUserLogin();
  const [activeItem, setActiveItem] = useState("Home");
  const routes = useRoutes();
  const [deviceType, setDeviceType] = useState("");

  //detect media device
  useEffect(() => {
    console.log(navigator.userAgent);
    if (navigator.userAgent.indexOf("Android") > 0) {
      setDeviceType(DEVICE_TYPE_MOBILE_ANDROID);
    } else if (navigator.userAgent.indexOf("iPhone") > 0) {
      setDeviceType(DEVICE_TYPE_MOBILE_IOS);
    } else {
      setDeviceType(DEVICE_TYPE_DESKTOP);
    }
  }, [navigator.userAgent]);

  const signOut = e => {
    e.preventDefault();
    dispatch(actionLogout());
  };

  useEvent(LOGOUT_SUCCESS, () => {
    dispatch(actionClearState());
  });

  if (!userLogin) {
    return <Redirect to={routesMap.login} />;
  }

  return (
    <Router history={history}>
      {deviceType === DEVICE_TYPE_DESKTOP ? (
        <Grid>
          <Grid.Column width={3}>
            <MainMenu
              vertical={true}
              setActiveItem={setActiveItem}
              activeItem={activeItem}
              onLogout={e => signOut(e)}
            />
          </Grid.Column>
          <Grid.Column width={12} style={{ padding: "20px" }}>
            <Suspense fallback={<Loading />}>
              <Switch>
                {routes.map((route, index) => {
                  return route.component ? (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
              </Switch>
            </Suspense>
          </Grid.Column>
        </Grid>
      ) : (
        <div>
          <div>
            <MainMenu
              fixed={deviceType === DEVICE_TYPE_MOBILE_ANDROID ? 'top' : 'bottom'}
              vertical={false}
              setActiveItem={setActiveItem}
              activeItem={activeItem}
              onLogout={e => signOut(e)}
            />
          </div>
          <Grid.Row>
            <Suspense fallback={<Loading />}>
              <Switch>
                {routes.map((route, index) => {
                  return route.component ? (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
              </Switch>
            </Suspense>
          </Grid.Row>
        </div>
      )}
    </Router>
  );
}
