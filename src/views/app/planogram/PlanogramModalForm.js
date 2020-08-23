import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";
import LoaderButton from "../../../components/buttons/LoaderButton";
import IntlMessages from "../../../utils/IntlMessages";
import ImagePickerModal from "../../../components/common/ImagePickerModal";
import { Alert } from "reactstrap";
import { croppedImage } from "../app-styles";

const PlanogramForm = ({
  isOpen,
  closeModal,
  planogram,
  submitPlanogramForm,
  loading,
}) => {
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
  const onAddUpdatePlanogramModalClose = () => {
    if (loading) {
      return;
    }
    setCropResult(undefined);
    closeModal();
  };

  // submit form
  const onPlanogramFormSubmit = (data) => {
    if (cropResult) {
      data.image = cropResult;
    }
    submitPlanogramForm(data);
  };

  // set cropped image
  const onCroppedResult = (result) => {
    setCropResult(result);
  };

  useEffect(() => {
    if (isOpen) {
      if (!planogram.image) {
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

      <Modal isOpen={isOpen} toggle={() => onAddUpdatePlanogramModalClose()}>
        <ModalHeader toggle={() => onAddUpdatePlanogramModalClose()}>
          {planogram.id ? (
            <IntlMessages id="planogram.update" />
          ) : (
            <IntlMessages id="planogram.new" />
          )}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onPlanogramFormSubmit)}>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.name" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="name"
                    // placeholder="Enter Name"
                    control={control}
                    defaultValue={planogram.name || ""}
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
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.description" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="description"
                    // placeholder="Enter Description"
                    control={control}
                    defaultValue={planogram.description || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.description && (
                    <Alert color="danger">{errors.description.message}</Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.version" />
                  </Label>
                  <Controller
                    as={Input}
                    type="number"
                    name="version"
                    // placeholder="Enter Version"
                    control={control}
                    defaultValue={planogram.version || 1}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.version && (
                    <Alert color="danger">{errors.version.message}</Alert>
                  )}
                </FormGroup>
              </div>
            </div>
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
                  >
                    <IntlMessages id="button.select" />
                  </Button>
                  <br />
                  {cropResult && cropResult !== "NOIMAGE" && (
                    <img src={cropResult} style={croppedImage} />
                  )}
                  {planogram.image && !cropResult && (
                    <>
                      <img src={planogram.image} style={croppedImage} />
                      <br />
                      <Button
                        variant="contained"
                        className="btn-danger tour-step-4 text-white"
                        style={{ display: "block" }}
                        onClick={() => {
                          setCropResult("NOIMAGE");
                        }}
                        disabled={loading}
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
            actionClick={handleSubmit(onPlanogramFormSubmit)}
            loading={loading}
          >
            {planogram.id ? (
              <IntlMessages id="button.save" />
            ) : (
              <IntlMessages id="button.add" />
            )}
          </LoaderButton>

          <Button
            variant="contained"
            className={loading ? "" : "text-white btn-danger"}
            onClick={() => onAddUpdatePlanogramModalClose()}
            disabled={loading}
          >
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PlanogramForm;
