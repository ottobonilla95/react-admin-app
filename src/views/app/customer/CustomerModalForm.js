import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import LoaderButton from "../../../components/buttons/LoaderButton";
import IntlMessages from "../../../utils/IntlMessages";
import { Alert } from "reactstrap";

// components
import LocationPickerModal from "../../../components/common/LocationPickerModal";

const CustomerForm = ({
  isOpen,
  closeModal,
  customer,
  submitCustomerForm,
  loading,
}) => {
  const [showLocationPickerModal, setShowLocationPickerModal] = useState(false);
  const [missingPosition, setMissingPosition] = useState(undefined);

  const { control, handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      name: customer.name || "",
      mobile_number: customer.mobile_number || "",
      email: customer.email || "",
      street_name: customer.street_name || "",
      state: customer.state || "",
      country: customer.country || "",
      postal_code: customer.postal_code || "",
      latitude: customer.latitude || "",
      longitude: customer.longitude || "",
    },
  });

  const onAddUpdateCustomerModalClose = () => {
    if (loading) {
      return;
    }
    closeModal();
  };
  const onCustomerFormSubmit = (data) => {
    if (!data.latitude || !data.longitude) {
      setMissingPosition(true);
      return;
    }

    submitCustomerForm(data);
  };

  return (
    <>
      <LocationPickerModal
        isOpen={showLocationPickerModal}
        closeModal={() => {
          setShowLocationPickerModal(false);
        }}
        setPosition={(position) => {
          setValue("latitude", position.lat);
          setValue("longitude", position.lng);
          setMissingPosition(false);
        }}
      />

      <Modal isOpen={isOpen} toggle={() => onAddUpdateCustomerModalClose()}>
        <ModalHeader toggle={() => onAddUpdateCustomerModalClose()}>
          {customer.id ? (
            <IntlMessages id="customer.update" />
          ) : (
            <IntlMessages id="customer.new" />
          )}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onCustomerFormSubmit)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.name" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="name"
                    // placeholder="Enter Name"
                    control={control}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.name && (
                    <Alert color="danger">{errors.name.message}</Alert>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.mobilenumber" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="mobile_number"
                    // placeholder="Enter Mobile Number"
                    control={control}
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
            </Row>
            <Row form>
              <Col md={6}>
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
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.streetname" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="street_name"
                    // placeholder="Enter Street Name"
                    control={control}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.street_name && (
                    <Alert color="danger">{errors.street_name.message}</Alert>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    {" "}
                    <IntlMessages id="form.state" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="state"
                    // placeholder="Enter State"
                    control={control}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.state && (
                    <Alert color="danger">{errors.state.message}</Alert>
                  )}
                </FormGroup>
              </Col>
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
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.postalcode" />
                  </Label>
                  <Controller
                    as={Input}
                    type="number"
                    name="postal_code"
                    // placeholder="Enter Postal Code"
                    control={control}
                    disabled={loading}
                  />
                </FormGroup>
              </Col>
            </Row>

            <hr />

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.latitude" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="latitude"
                    // placeholder="Enter Latitude"
                    control={control}
                    disabled={true}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.longitude" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="longitude"
                    // placeholder="Enter Longitude"
                    control={control}
                    disabled={true}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="row">
              <div className="col-md-12 col-xs-12">
                {missingPosition && (
                  <Alert color="danger">
                    <IntlMessages id="validationmessage.required" />
                  </Alert>
                )}
                <Button
                  variant="contained"
                  className={loading ? "" : "text-white btn-success"}
                  onClick={() => setShowLocationPickerModal(true)}
                  disabled={loading}
                >
                  <IntlMessages id="button.selectlocation" />
                </Button>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <LoaderButton
            classNameButton="text-white btn-success"
            actionClick={handleSubmit(onCustomerFormSubmit)}
            loading={loading}
          >
            {customer.id ? (
              <IntlMessages id="button.save" />
            ) : (
              <IntlMessages id="button.add" />
            )}
          </LoaderButton>

          <Button
            variant="contained"
            className={loading ? "" : "text-white btn-danger"}
            onClick={() => onAddUpdateCustomerModalClose()}
            disabled={loading}
          >
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CustomerForm;
