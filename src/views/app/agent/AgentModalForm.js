import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";

// components
import LoaderButton from "../../../components/buttons/LoaderButton";
import IntlMessages from "../../../utils/IntlMessages";
import ImagePickerModal from "../../../components/common/ImagePickerModal";

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
  Col,
  Row,
} from "reactstrap";

// styles
import { croppedImage } from "../app-styles";

const AgentForm = ({ isOpen, closeModal, agent, submitAgentForm, loading }) => {
  const { control, handleSubmit, errors } = useForm();
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [cropResult, setCropResult] = useState(undefined);

  // open image picker modal
  const openImagePickerModal = () => {
    setShowImagePickerModal(true);
  };

  // close image picker modal
  const closeImagePickerModal = () => {
    setShowImagePickerModal(false);
  };

  // close modal
  const onAddUpdateAgentModalClose = () => {
    if (loading) {
      return;
    }
    setCropResult(undefined);
    closeModal();
  };

  // submit form
  const onAgentFormSubmit = (data) => {
    if (cropResult) {
      data.image = cropResult;
    }
    submitAgentForm(data);
  };

  // set cropped image
  const onCroppedResult = (result) => {
    setCropResult(result);
  };

  useEffect(() => {
    if (isOpen) {
      if (!agent.image) {
        setCropResult(undefined);
      }
    }
  }, [isOpen]);

  return (
    <>
      <ImagePickerModal
        isOpen={showImagePickerModal}
        closeModal={closeImagePickerModal}
        setCropResult={onCroppedResult}
      />

      <Modal isOpen={isOpen} toggle={() => onAddUpdateAgentModalClose()}>
        <ModalHeader toggle={() => onAddUpdateAgentModalClose()}>
          {agent.id ? (
            <IntlMessages id="agent.update" />
          ) : (
            <IntlMessages id="agent.new" />
          )}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onAgentFormSubmit)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.firstname" />
                  </Label>

                  <Controller
                    as={Input}
                    type="text"
                    name="first_name"
                    // placeholder={(<IntlMessages id="form.firstname" />)}
                    control={control}
                    defaultValue={agent.first_name || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.first_name && (
                    <Alert color="danger">{errors.first_name.message}</Alert>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.lastname" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="last_name"
                    // placeholder="Enter Last Name"
                    control={control}
                    defaultValue={agent.last_name || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.last_name && (
                    <Alert color="danger">{errors.last_name.message}</Alert>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.username" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="username"
                    // placeholder="Enter UserName"
                    control={control}
                    defaultValue={agent.username || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.username && (
                    <Alert color="danger">{errors.username.message}</Alert>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.email" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="email"
                    // placeholder="Enter Email"
                    control={control}
                    defaultValue={agent.email || ""}
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
                    disabled={loading}
                  />
                  {errors.email && (
                    <Alert color="danger">{errors.email.message}</Alert>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.mobilenumber" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="mobile_number"
                    // placeholder="Enter Mobile Number"
                    control={control}
                    defaultValue={agent.mobile_number || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                      pattern: {
                        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                        message: (
                          <IntlMessages id="validationmessage.invalidmobilenumber" />
                        ),
                      },
                    }}
                    disabled={loading}
                  />
                  {errors.mobile_number && (
                    <Alert color="danger">{errors.mobile_number.message}</Alert>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.initialpassword" />
                  </Label>
                  <Controller
                    as={Input}
                    type="password"
                    name="password"
                    // placeholder="Enter Initial Password"
                    control={control}
                    defaultValue={agent.password || ""}
                    disabled={loading}
                  />
                  {errors.password && (
                    <Alert color="danger">{errors.password.message}</Alert>
                  )}
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.country" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="country"
                    // placeholder="Enter Country"
                    control={control}
                    defaultValue={agent.country || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.country && (
                    <Alert color="danger">{errors.country.message}</Alert>
                  )}
                </FormGroup>
              </Col>
            </Row>

            <hr />
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <FormGroup>
                  <Label for="userName" style={{ display: "block" }}>
                    <IntlMessages id="form.image" />
                  </Label>

                  <Button
                    variant="contained"
                    className="upgrade-btn tour-step-4 text-white"
                    color="primary"
                    style={{ display: "block" }}
                    onClick={openImagePickerModal}
                    disabled={loading}
                  >
                    <IntlMessages id="button.select" />
                  </Button>
                  <br />
                  {cropResult && cropResult !== "NOIMAGE" && (
                    <img src={cropResult} style={croppedImage} />
                  )}
                  {agent.image && !cropResult && (
                    <>
                      <img src={agent.image} style={croppedImage} />
                      <br />
                      <Button
                        variant="contained"
                        className="btn-danger tour-step-4 text-white"
                        style={{ display: "block" }}
                        onClick={() => {
                          setCropResult("NOIMAGE");
                        }}
                      >
                        <IntlMessages id="button.delete" />
                      </Button>
                    </>
                  )}
                </FormGroup>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <LoaderButton
            classNameButton="text-white btn-success"
            actionClick={handleSubmit(onAgentFormSubmit)}
            loading={loading}
          >
            {agent.id ? (
              <IntlMessages id="button.save" />
            ) : (
              <IntlMessages id="button.add" />
            )}
          </LoaderButton>

          <Button
            variant="contained"
            className={loading ? "" : "text-white btn-danger"}
            onClick={() => onAddUpdateAgentModalClose()}
            disabled={loading}
          >
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AgentForm;
