/**
 * App Routes
 */
import React, { Component, Suspense } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

// CircularProgress
import CircularProgress from "@material-ui/core/CircularProgress";

// app default layout
import AppLayout from "../../layout/AppLayout";

const Home = React.lazy(() => import("./home/index"));
const Customer = React.lazy(() => import("./customer/index"));
const Agent = React.lazy(() => import("./agent/index"));
const Product = React.lazy(() => import("./product/index"));
const Task = React.lazy(() => import("./task/index"));
const Planogram = React.lazy(() => import("./planogram/index"));
const Profile = React.lazy(() => import("./profile/index"));
const UserManagement = React.lazy(() => import("./user-management/index"));
const Company = React.lazy(() => import("./company/index"));

// router
import AdminRoute from "../../utils/AdminRoute";
import UserRoute from "../../utils/UserRoute";
import SuperAdminRoute from "../../utils/SuperAdminRoute";

const MainApp = ({ match }) => {

  return (
    <AppLayout>
      <Suspense
        fallback={<CircularProgress className="mr-30 mb-10 progress-primary" />}
      >
        <UserRoute path={`${match.url}/home`} component={Home} />
        <UserRoute path={`${match.url}/customer`} component={Customer} />
        <UserRoute path={`${match.url}/agent`} component={Agent} />
        <UserRoute path={`${match.url}/product`} component={Product} />
        <UserRoute path={`${match.url}/task`} component={Task} />
        <UserRoute path={`${match.url}/planogram`} component={Planogram} />
        <Route path={`${match.url}/profile`} component={Profile} />
        <AdminRoute
          path={`${match.url}/usermanagement`}
          component={UserManagement}
        />
        <SuperAdminRoute path={`${match.url}/company`} component={Company} />
      </Suspense>
    </AppLayout>
  );
};

export default withRouter(MainApp);
