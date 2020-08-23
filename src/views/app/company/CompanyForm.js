/**
 * Company Management Page
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// NotificationManager
import { NotificationManager } from "react-notifications";

// reacstrap
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { withRouter } from "react-router-dom";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

// material ui
import LinearProgress from "@material-ui/core/LinearProgress";

// page title bar
import PageTitleBar from "../../../components/common/PageTitleBar";

// intl messages
import IntlMessages from "../../../utils/IntlMessages";

// rct card box
import RctCollapsibleCard from "../../../components/cards/RctCollapsibleCard";

// rct section loader
import RctSectionLoader from "../../../components/loaders/SectionLoader";

// form
import { useForm, Controller } from "react-hook-form";

import UserComponent from "./UserComponent";

const CompanyForm = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const { control, handleSubmit, errors } = useForm();
  const [users, setUsers] = useState(props.currentCompany.users || []);

  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const AddUser = (newUser) => {
    if (!newUser.id) {
      let existsUser = users.find((user) => {
        if (
          user.username === newUser.username ||
          user.email === newUser.email
        ) {
          return true;
        }
      });

      if (existsUser) {
        NotificationManager.error("Duplicate username or email");
        return;
      }
      setUsers([...users, { ...newUser }]);
    } else {
      let finalUsers = users.filter((user) => {
        if (user.id === newUser.id) {
          return false;
        } else {
          return true;
        }
      });

      setUsers([...finalUsers, { ...newUser }]);
    }
  };

  const DeleteUser = (userToDelete) => {
    let finalUsers = users.filter((user) => {
      if (user === userToDelete) {
        return false;
      } else {
        return true;
      }
    });
    setUsers(finalUsers);
  };

  // submit form
  const onCompanyFormSubmit = (data) => {
    props.onSubmit({
      ...data,
      users,
      id: props.currentCompany ? props.currentCompany.id : undefined,
    });
  };

  const currentCompany = props.currentCompany ? props.currentCompany : {};
  const steps = [1, 2];
  return (
    <>
      <div className="company-management">
        <Helmet>
          <title> Management</title>
          <meta name="description" content="Widgets" />
        </Helmet>
        <PageTitleBar
          title={<IntlMessages id="sidebar.company" />}
          match={props.match}
        />
        <RctCollapsibleCard fullBlock>
          {props.loading && <LinearProgress />}

          <div className="hoz-linear-stepper">
            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>
                  <IntlMessages id="company.companydetails" />
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  <IntlMessages id="company.createusers" />
                </StepLabel>
              </Step>
            </Stepper>
            <div className="pl-40 pr-40">
              {activeStep === steps.length ? (
                <div>
                  <p className="">All steps completed - you&quot;re finished</p>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    className="btn-success text-white"
                  >
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  <Form onSubmit={handleSubmit(onCompanyFormSubmit)}>
                    <div
                      style={{
                        display: activeStep !== 0 ? "none" : "block",
                      }}
                    >
                      <FormGroup>
                        <Label for="name">
                          <IntlMessages id="form.name" />
                        </Label>
                        <Controller
                          as={Input}
                          type="text"
                          name="name"
                          // placeholder="Enter Name"
                          control={control}
                          defaultValue={currentCompany.name || ""}
                          rules={{
                            required: (
                              <IntlMessages id="validationmessage.required" />
                            ),
                          }}
                          disabled={props.loading}
                        />
                        {errors.name && (
                          <Alert color="danger">{errors.name.message}</Alert>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for="name">
                          <IntlMessages id="form.email" />
                        </Label>
                        <Controller
                          as={Input}
                          type="text"
                          name="email"
                          // placeholder="Enter Email"
                          control={control}
                          defaultValue={currentCompany.email || ""}
                          rules={{
                            required: (
                              <IntlMessages id="validationmessage.required" />
                            ),
                            pattern: {
                              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                              message: (
                                <IntlMessages id="validationmessage.invalidemail" />
                              ),
                            },
                          }}
                          disabled={props.loading}
                        />
                        {errors.email && (
                          <Alert color="danger">{errors.email.message}</Alert>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for="name">
                          <IntlMessages id="form.mobilenumber" />
                        </Label>
                        <Controller
                          as={Input}
                          type="text"
                          name="mobile_number"
                          // placeholder="Enter Mobile Number"
                          control={control}
                          defaultValue={currentCompany.mobile_number || ""}
                          rules={{
                            required: (
                              <IntlMessages id="validationmessage.required" />
                            ),
                          }}
                          disabled={props.loading}
                        />
                        {errors.mobile_number && (
                          <Alert color="danger">
                            {errors.mobile_number.message}
                          </Alert>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for="name">
                          <IntlMessages id="form.address" />
                        </Label>
                        <Controller
                          as={Input}
                          type="text"
                          name="address"
                          // placeholder="Enter Address"
                          control={control}
                          defaultValue={currentCompany.address || ""}
                          rules={{
                            required: (
                              <IntlMessages id="validationmessage.required" />
                            ),
                          }}
                          disabled={props.loading}
                        />
                        {errors.address && (
                          <Alert color="danger">{errors.address.message}</Alert>
                        )}
                      </FormGroup>
                    </div>
                    <div
                      style={{
                        display: activeStep !== 1 ? "none" : "block",
                      }}
                    >
                      <UserComponent
                        users={users}
                        AddUser={AddUser}
                        currentCompany={props.currentCompany}
                        DeleteUser={DeleteUser}
                      />
                    </div>
                    <br />
                    <div>
                      {Object.keys(errors).length !== 0 && (
                        <Alert color="danger">
                          <IntlMessages id="validationmessage.pleasecompletetheform" />
                        </Alert>
                      )}
                      {activeStep !== 0 && (
                        <Button
                          onClick={handleBack}
                          className="btn-danger text-white mr-10 mb-10"
                        >
                          Back
                        </Button>
                      )}

                      {activeStep === steps.length - 1 ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="text-white mr-10 mb-10"
                          disabled={users.length === 0}
                        >
                          <IntlMessages id="button.save" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="contained"
                          onClick={handleNext}
                          color="primary"
                          className="text-white mr-10 mb-10"
                        >
                          <IntlMessages id="button.next" />
                        </Button>
                      )}
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </div>

          {props.loading && <RctSectionLoader />}
        </RctCollapsibleCard>
      </div>
    </>
  );
};

// const mapStateToProps = ({ company, auth }) => {
//   return { company, auth };
// };
export default withRouter(CompanyForm);

// export default connect(mapStateToProps, {
//   createCompany,
// })(CompanyForm);
