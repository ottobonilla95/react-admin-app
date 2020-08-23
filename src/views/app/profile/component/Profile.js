import React, { Component } from "react";
// reacstrap
import {
  FormGroup,
  Input,
  Form,
  Label,
  Col,
  InputGroup,
  InputGroupAddon,
  Alert,
} from "reactstrap";

// material ui
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

// react-hook-form
import { useForm, Controller } from "react-hook-form";

// redux
import { connect } from "react-redux";

// actions
import { updateProfile } from "../../../../redux/auth/actions";

// intlmessages
import IntlMessages from "../../../../utils/IntlMessages";

const Profile = (props) => {
  const { control, errors, handleSubmit } = useForm();

  const onUpdateProfile = (data) => {
    props.updateProfile(data);
  };

  return (
    <div className="profile-wrapper w-50">
      <h2 className="heading">
        <IntlMessages id="profile.personalDetails" />
      </h2>
      <Form onSubmit={handleSubmit(onUpdateProfile)}>
        <FormGroup row>
          <Label for="username" sm={3}>
            <IntlMessages id="profile.username" />
          </Label>
          <Col sm={9}>
            <Controller
              as={Input}
              type="text"
              name="username"
              id="username"
              className="input-lg"
              disabled={props.auth.loading}
              control={control}
              rules={{
                required: <IntlMessages id="validationmessage.required" />,
              }}
              defaultValue={props.auth.user.user.username || ""}
            />
            {errors.username && (
              <Alert color="danger">{errors.username.message}</Alert>
            )}
          </Col>
        </FormGroup>
        <hr />

        {props.auth.loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="text-white"
            type="submit"
          >
            <IntlMessages id="button.save" />
          </Button>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps, { updateProfile })(Profile);
