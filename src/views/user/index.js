import React, { Suspense } from "react";

// react-router-dom
import { Route, Switch, Redirect } from "react-router-dom";

const Login = React.lazy(() => import("./login"));

const User = ({ match }) => {
  return (
    <Suspense fallback="loading...">
      <Switch>
        <Route path={`${match.path}/`} exact>
          <Redirect to={`${match.path}/login`} />
        </Route>
        <Route path={`${match.path}/login`} component={Login} />
    
      </Switch>
    </Suspense>
  );
};

export default User;
