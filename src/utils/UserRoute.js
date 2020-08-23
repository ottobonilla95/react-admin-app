import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ component: Component, adminUser, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={(props) =>
        user.user.role_id === 2 || user.user.role_id === 3 ? (
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

export default UserRoute;
