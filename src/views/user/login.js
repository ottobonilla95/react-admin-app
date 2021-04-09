import React from "react";

// redux
import { connect } from "react-redux";

// QueueAnim
import QueueAnim from "rc-queue-anim";

// material-ui
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import LinearProgress from "@material-ui/core/LinearProgress";

// history
import history from "../../utils/history";

// reactstrap
import { Alert } from "reactstrap";
import { Form, FormGroup, Input } from "reactstrap";

// IntlMessages
import IntlMessages from "../../utils/IntlMessages";

// react-hook-form
import { useForm, Controller } from "react-hook-form";

// components
import SessionSlider from "../../components/common/SessionSlider";

// actions
import { signinUser } from "../../redux/auth/actions";

const Login = (props) => {
  const { errors, handleSubmit, control } = useForm();

  const onUserLogin = (userData) => {
    props.signinUser(userData);
  };

  return (
    <QueueAnim type="bottom" duration={2000}>
      <div className="rct-session-wrapper">
        {props.loading && <LinearProgress />}
        <AppBar position="static" className="session-header"></AppBar>
        <div className="session-inner-wrapper">
          <div className="container">
            {/* <div className="row row-eq-height" style={{ alignSelf: "center" }}> */}

            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="session-body text-center">
                <div className="session-head mb-30">
                  <h2 className="font-weight-bold">Admin App</h2>
                </div>
                <Form onSubmit={handleSubmit(onUserLogin)}>
                  <FormGroup className="has-wrapper">
                    <Controller
                      as={Input}
                      type="mail"
                      name="email"
                      placeholder="Enter Email Address"
                      control={control}
                      rules={{
                        required: (
                          <IntlMessages id="validationmessage.required" />
                        ),
                      }}
                      className="has-input input-lg"
                      defaultValue=""
                    />
                    {errors.email && (
                      <Alert color="danger">{errors.email.message}</Alert>
                    )}
                    <span className="has-icon">
                      <i className="ti-email"></i>
                    </span>
                  </FormGroup>
                  <FormGroup className="has-wrapper">
                    <Controller
                      as={Input}
                      type="Password"
                      name="password"
                      placeholder="Password"
                      control={control}
                      rules={{
                        required: (
                          <IntlMessages id="validationmessage.required" />
                        ),
                      }}
                      className="has-input input-lg"
                      defaultValue=""
                    />
                    {errors.password && (
                      <Alert color="danger">{errors.password.message}</Alert>
                    )}
                    <span className="has-icon">
                      <i className="ti-lock"></i>
                    </span>
                  </FormGroup>
                  <FormGroup className="mb-15">
                    <Button
                      color="primary"
                      className="btn-block text-white w-100"
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </FormGroup>
                </Form>

                <Button
                  color="secondary"
                  className="btn-block text-white w-100"
                  variant="contained"
                  size="large"
                  onClick={() => history.push("/gest")}
                >
                  Info
                </Button>
              </div>
            </div>
            <div className="col-sm-5 col-md-5 col-lg-4">
              <SessionSlider />
            </div>
          </div>
        </div>
      </div>
    </QueueAnim>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user, loading } = auth;
  return { user, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signinUser: (userData) => dispatch(signinUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
