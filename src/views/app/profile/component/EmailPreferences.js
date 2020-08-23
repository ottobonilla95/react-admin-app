/**
 * Email Prefrences Page
 */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { FormGroup, Input, Form, Alert } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

// react-hook-form
import { useForm, Controller } from "react-hook-form";

// redux
import { connect } from "react-redux";

// actions
import { updateProfileEmail } from "../../../../redux/auth/actions";

// intl messages
import IntlMessages from "../../../../utils/IntlMessages";

const LanguagePrefrences = (props) => {
  const { control, errors, handleSubmit } = useForm();

  const onUpdateEmail = (data) => {
    props.updateProfileEmail(data.email);
  };
  return (
    <div className="prefrences-wrapper">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <div className="search-filter p-0 mb-50">
            <Form onSubmit={handleSubmit(onUpdateEmail)}>
              <h2 className="heading">
                <IntlMessages id="profile.updateYourEmailAddress" />
              </h2>

              <FormGroup className="mb-0 w-40">
                <Controller
                  as={Input}
                  type="text"
                  className="input-lg"
                  name="email"
                  placeholder="info@example.com"
                  control={control}
                  disabled={props.auth.loading}
                  rules={{
                    required: <IntlMessages id="validationmessage.required" />,
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                      message: (
                        <IntlMessages id="validationmessage.invalidemail" />
                      ),
                    },
                  }}
                  defaultValue={props.auth.user.user.email || ""}
                />
                {errors.email && (
                  <Alert color="danger">{errors.email.message}</Alert>
                )}
              </FormGroup>

              {props.auth.loading ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="text-white btn-lg"
                  type="submit"
                >
                  <IntlMessages id="button.save" />
                </Button>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { updateProfileEmail })(
  LanguagePrefrences
);
