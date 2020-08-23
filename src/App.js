import React, { lazy, Suspense } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import history from "./utils/history";

import RctThemeProvider from "./RctThemeProvider";

import { NotificationContainer } from "react-notifications";
// css
import "./utils/AppStyle";

// firebase
import "./helpers/firebase";

// redux
import { connect } from "react-redux";
import { signinUserSuccess } from "./redux/auth/actions";
import { LoadUserTheme, LoadUserLanguage } from "./redux/settings/actions";

// app component
const ViewApp = React.lazy(() => import("./views/app"));

const ViewUser = React.lazy(() => import("./views/user"));

// router
import ProtectedRoute from "./utils/ProtectedRoute";

const MainApp = (props) => {
  let isLogginIn = false;

  if (localStorage.getItem("user") && !props.auth.user.userToken.access_token) {
    let user = JSON.parse(localStorage.getItem("user"));
    props.signinUserSuccess(user);

    props.LoadUserTheme(user.user.profile_config);
    props.LoadUserLanguage(user.user.profile_config.language);
    isLogginIn = true;
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <RctThemeProvider>
        <NotificationContainer />
        <Suspense fallback="loading...">
          <Router history={history}>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/app" />
              </Route>

              <ProtectedRoute
                path="/app"
                component={ViewApp}
                authUser={isLogginIn || props.auth.isLoggedIn}
              />
              <Route path="/user" component={ViewUser}></Route>
            </Switch>
          </Router>
        </Suspense>
      </RctThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {
  signinUserSuccess,
  LoadUserTheme,
  LoadUserLanguage,
})(MainApp);
