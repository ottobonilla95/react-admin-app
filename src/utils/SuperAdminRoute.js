import React from "react";
import { Route, Redirect } from "react-router-dom";

const SuperAdminRoute = ({ component: Component, adminUser, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={(props) =>
        user.user.role_id === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/app",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default SuperAdminRoute;
