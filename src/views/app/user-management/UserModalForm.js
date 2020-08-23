import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";

// components
import LoaderButton from "../../../components/buttons/LoaderButton";
import IntlMessages from "../../../utils/IntlMessages";

// reacstrap
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

// styles
import { croppedImage } from "../app-styles";

const UserForm = ({ isOpen, closeModal, user, submitUserForm, loading }) => {
  const { control, handleSubmit, errors, watch } = useForm();

  // close modal
  const onAddUpdateUserModalClose = () => {
    if (loading) {
      return;
    }
    closeModal();
  };

  // submit form
  const onUserFormSubmit = (data) => {
    const finalData = {
      username: data.username,
      email: data.email,
      password: data.password,
      role_id: data.admin ? 2 : 3,
    };

    submitUserForm(finalData);
  };

  const admin = user.id ? user.role.id === 2 : false;
  return (
    <>
      <Modal isOpen={isOpen} toggle={() => onAddUpdateUserModalClose()}>
        <ModalHeader toggle={() => onAddUpdateUserModalClose()}>
          {user.id ? (
            <IntlMessages id="usermanagement.update" />
          ) : (
            <IntlMessages id="usermanagement.new" />
          )}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onUserFormSubmit)}>
            <FormGroup>
              <Label for="userName">
                <IntlMessages id="form.username" />
              </Label>
              <Controller
                as={Input}
                type="text"
                name="username"
                // placeholder="Enter User Name"
                control={control}
                defaultValue={user.username || ""}
                rules={{
                  required: <IntlMessages id="validationmessage.required" />,
                }}
                disabled={loading}
              />
              {errors.username && (
                <Alert color="danger">{errors.username.message}</Alert>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="userName">
                <IntlMessages id="form.email" />
              </Label>
              <Controller
                as={Input}
                type="text"
                name="email"
                // placeholder="Enter Email"
                control={control}
                defaultValue={user.email || ""}
                rules={{
                  required: <IntlMessages id="validationmessage.required" />,
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                    message: (
                      <IntlMessages id="validationmessage.invalidemail" />
                    ),
                  },
                }}
                disabled={loading}
              />
              {errors.email && (
                <Alert color="danger">{errors.email.message}</Alert>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="userName">
                <IntlMessages id="form.password" />
              </Label>
              <Controller
                as={Input}
                type="password"
                name="password"
                // placeholder="Enter Password"
                control={control}
                defaultValue=""
                rules={{
                  required: user.id ? (
                    false
                  ) : (
                    <IntlMessages id="validationmessage.required" />
                  ),
                }}
                disabled={loading}
              />
              {errors.password && (
                <Alert color="danger">{errors.password.message}</Alert>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="userName">
                <IntlMessages id="form.confirmpassword" />
              </Label>
              <Controller
                as={Input}
                type="password"
                name="confirmPassword"
                // placeholder="Enter Confirm password"
                control={control}
                defaultValue={""}
                rules={{
                  required: user.id ? (
                    false
                  ) : (
                    <IntlMessages id="validationmessage.required" />
                  ),
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return "Passwords dont match";
                    }
                  },
                }}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <Alert color="danger">{errors.confirmPassword.message}</Alert>
              )}
            </FormGroup>
            <FormGroup check className="mb-20">
              <Label check>
                <Controller
                  as={Input}
                  type="checkbox"
                  name="admin"
                  control={control}
                  defaultValue={admin || false}
                  disabled={loading}
                />
                <IntlMessages id="form.admin" />
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <LoaderButton
            classNameButton="text-white btn-success"
            actionClick={handleSubmit(onUserFormSubmit)}
            loading={loading}
          >
            {user.id ? (
              <IntlMessages id="button.save" />
            ) : (
              <IntlMessages id="button.add" />
            )}
          </LoaderButton>

          <Button
            variant="contained"
            className={loading ? "" : "text-white btn-danger"}
            onClick={() => onAddUpdateUserModalClose()}
            disabled={loading}
          >
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserForm;
