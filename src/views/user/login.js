import React from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import QueueAnim from "rc-queue-anim";

// material-ui
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Fab } from "@material-ui/core";

import { Alert } from "reactstrap";
import IntlMessages from "../../utils/IntlMessages";
import { useForm, Controller } from "react-hook-form";

// components
import SessionSlider from "../../components/common/SessionSlider";

// app config
import AppConfig from "Constants/AppConfig";

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
        <AppBar position="static" className="session-header">
          <Toolbar>
            <div className="container">
              <div className="d-flex justify-content-between">
                <div className="session-logo">
                  <Link to="/">
                    <img
                      src={AppConfig.appLogo}
                      alt="session-logo"
                      className="img-fluid"
                      width="110"
                      height="35"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <div className="session-inner-wrapper">
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-sm-7 col-md-7 col-lg-8">
                <div className="session-body text-center">
                  <div className="session-head mb-30">
                    <h2 className="font-weight-bold">
                      Get started with {AppConfig.brandName}
                    </h2>
                    <p className="mb-0">Most powerful ReactJS admin panel</p>
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
                  <p className="mb-20">or sign in with</p>
                  <Fab
                    variant="round"
                    size="small"
                    className="btn-facebook mr-15 mb-20 text-white"
                    onClick={() =>
                      this.props.signinUserWithFacebook(this.props.history)
                    }
                  >
                    <i className="zmdi zmdi-facebook"></i>
                  </Fab>
                  <Fab
                    variant="round"
                    size="small"
                    className="btn-google mr-15 mb-20 text-white"
                    onClick={() =>
                      this.props.signinUserWithGoogle(this.props.history)
                    }
                  >
                    <i className="zmdi zmdi-google"></i>
                  </Fab>
                  <Fab
                    variant="round"
                    size="small"
                    className="btn-twitter mr-15 mb-20 text-white"
                    onClick={() =>
                      this.props.signinUserWithTwitter(this.props.history)
                    }
                  >
                    <i className="zmdi zmdi-twitter"></i>
                  </Fab>
                  <Fab
                    variant="round"
                    size="small"
                    className="btn-instagram mr-15 mb-20 text-white"
                    onClick={() =>
                      this.props.signinUserWithGithub(this.props.history)
                    }
                  >
                    <i className="zmdi zmdi-github-alt"></i>
                  </Fab>
                  <p className="text-muted">
                    By signing up you agree to {AppConfig.brandName}
                  </p>
                  <p className="mb-0">
                    <a
                      target="_blank"
                      href="#/terms-condition"
                      className="text-muted"
                    >
                      Terms of Service
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-sm-5 col-md-5 col-lg-4">
                <SessionSlider />
              </div>
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
