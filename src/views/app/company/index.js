/**
 * App Routes
 */
import React, { Suspense } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

const CompanyList = React.lazy(() => import("./CompanyList"));
const CreateCompany = React.lazy(() => import("./CreateCompany"));
const UpdateCompany = React.lazy(() => import("./UpdateCompany"));

const Company = ({ match }) => {
  return (
    <Suspense
      fallback={<CircularProgress className="mr-30 mb-10 progress-primary" />}
    >

      <Route path={`${match.url}/`} exact component={CompanyList} />
      <Route path={`${match.url}/create`} component={CreateCompany} />
      <Route path={`${match.url}/edit`} component={UpdateCompany} />
    </Suspense>
  );
};

export default withRouter(Company);
