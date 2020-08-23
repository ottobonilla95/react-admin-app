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

const ProductForm = ({
  isOpen,
  closeModal,
  product,
  submitProductForm,
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
  const onAddUpdateProductModalClose = () => {
    if (loading) {
      return;
    }
    setCropResult(undefined);
    closeModal();
  };

  // submit
  const onProductFormSubmit = (data) => {
    if (cropResult) {
      data.image = cropResult;
    }
    submitProductForm(data);
  };
  // set cropped image
  const onCroppedResult = (result) => {
    setCropResult(result);
  };

  useEffect(() => {
    if (isOpen) {
      if (!product.image) {
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
      <Modal isOpen={isOpen} toggle={() => onAddUpdateProductModalClose()}>
        <ModalHeader toggle={() => onAddUpdateProductModalClose()}>
          {product.id ? (
            <IntlMessages id="product.update" />
          ) : (
            <IntlMessages id="product.new" />
          )}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onProductFormSubmit)}>
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
                    defaultValue={product.name || ""}
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
                    <IntlMessages id="form.upc" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="upc"
                    // placeholder="Enter UPC"
                    control={control}
                    defaultValue={product.upc || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.upc && (
                    <Alert color="danger">{errors.upc.message}</Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.category" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="category"
                    // placeholder="Enter Category"
                    control={control}
                    defaultValue={product.category || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.category && (
                    <Alert color="danger">{errors.category.message}</Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.subcategory" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="sub_category"
                    // placeholder="Enter Mobile SubCategory"
                    control={control}
                    defaultValue={product.sub_category || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.sub_category && (
                    <Alert color="danger">{errors.sub_category.message}</Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.brand" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="brand"
                    // placeholder="Enter Brand"
                    control={control}
                    defaultValue={product.brand || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.brand && (
                    <Alert color="danger">{errors.brand.message}</Alert>
                  )}
                </FormGroup>
              </div>
              <div className="col-md-6 col-xs-12">
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.subbrand" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="sub_brand"
                    // placeholder="Enter SubBrand"
                    control={control}
                    defaultValue={product.sub_brand || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.sub_brand && (
                    <Alert color="danger">{errors.sub_brand.message}</Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.container" />
                  </Label>
                  <Controller
                    as={Input}
                    type="text"
                    name="container"
                    // placeholder="Enter Container"
                    control={control}
                    defaultValue={product.container || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.container && (
                    <Alert color="danger">{errors.container.message}</Alert>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.volume" />
                  </Label>
                  <Controller
                    as={Input}
                    type="number"
                    name="volume"
                    // placeholder="Enter Volume"
                    control={control}
                    defaultValue={product.volume || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.volume && (
                    <Alert color="danger">{errors.volume.message}</Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.widthsize" />
                  </Label>
                  <Controller
                    as={Input}
                    type="number"
                    name="width_size"
                    // placeholder="Enter WidthSizec"
                    control={control}
                    defaultValue={product.width_size || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.width_size && (
                    <Alert color="danger">{errors.width_size.message}</Alert>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="userName">
                    <IntlMessages id="form.heightsize" />
                  </Label>
                  <Controller
                    as={Input}
                    type="number"
                    name="height_size"
                    // placeholder="Enter HeightSize"
                    control={control}
                    defaultValue={product.height_size || ""}
                    rules={{
                      required: (
                        <IntlMessages id="validationmessage.required" />
                      ),
                    }}
                    disabled={loading}
                  />
                  {errors.height_size && (
                    <Alert color="danger">{errors.height_size.message}</Alert>
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
                    disabled={loading}
                  >
                    <IntlMessages id="button.select" />
                  </Button>
                  <br />
                  {cropResult && cropResult !== "NOIMAGE" && (
                    <img src={cropResult} style={croppedImage} />
                  )}
                  {product.image && !cropResult && (
                    <>
                      <img src={product.image} style={croppedImage} />
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
            actionClick={handleSubmit(onProductFormSubmit)}
            loading={loading}
          >
            {product.id ? (
              <IntlMessages id="button.save" />
            ) : (
              <IntlMessages id="button.add" />
            )}
          </LoaderButton>

          <Button
            variant="contained"
            className={loading ? "" : "text-white btn-danger"}
            onClick={() => onAddUpdateProductModalClose()}
            disabled={loading}
          >
            <IntlMessages id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProductForm;
