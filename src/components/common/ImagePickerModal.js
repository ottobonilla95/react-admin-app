import React, { useState, useRef } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../utils/IntlMessages";
import DropzoneComponent from "react-dropzone-component";
import Cropper from "react-cropper";

const ImagePickerModal = ({ isOpen, closeModal, setCropResult }) => {
  const [image, setImage] = useState(undefined);
  //   const [cropResult, setCropResult] = useState(undefined);
  const cropperRef = useRef(null);

  //  close modal
  const onAddUpdateAgentModalClose = () => {
    setImage(undefined);
    closeModal();
  };

  //   drop zone event
  const dropZoneEventHandlers = {
    addedfile: (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  };

  //   drop zone conf
  const djsConfig = {
    autoProcessQueue: false,
  };

  const componentConfig = {
    postUrl: "no-url",
  };

  // crop image
  const cropImage = () => {
    if (typeof cropperRef.current.getCroppedCanvas() === "undefined") {
      return;
    }
    setCropResult(cropperRef.current.getCroppedCanvas().toDataURL());
    setImage(undefined);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} toggle={() => onAddUpdateAgentModalClose()}>
      <ModalHeader toggle={() => onAddUpdateAgentModalClose()}>
        <IntlMessages id="tittle.imagepicker" />
      </ModalHeader>
      <ModalBody>
        {!image && (
          <DropzoneComponent
            config={componentConfig}
            eventHandlers={dropZoneEventHandlers}
            djsConfig={djsConfig}
          />
        )}
        {image && (
          <Cropper
            style={{ height: 400, width: "100%" }}
            preview=".img-preview"
            guides={true}
            src={image}
            ref={cropperRef}
            aspectRatio={4 / 4}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          variant="contained"
          className="text-white btn-success"
          disbaled={!image}
          onClick={() => {
            cropImage();
          }}
        >
          <IntlMessages id="button.save" />
        </Button>

        <Button
          variant="contained"
          className="text-white btn-danger"
          onClick={() => setImage(undefined)}
        >
          <IntlMessages id="button.clear" />
        </Button>

        <Button
          variant="contained"
          className="text-white btn-danger"
          onClick={() => onAddUpdateAgentModalClose()}
        >
          <IntlMessages id="button.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImagePickerModal;
