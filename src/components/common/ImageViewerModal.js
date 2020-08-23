import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../utils/IntlMessages";

const ImageViewerModal = ({ image, closeModal }) => {
  const onAddUpdateAgentModalClose = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={image !== undefined}
      toggle={() => onAddUpdateAgentModalClose()}
    >
      <ModalHeader toggle={() => onAddUpdateAgentModalClose()}>
        <IntlMessages id="tittle.imageviewer" />
      </ModalHeader>
      <ModalBody>
        <div style={{ width: "100%", padding: "auto", textAlign: "center" }}>
          <img
            src={image}
            style={{
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="contained"
          className="text-white btn-danger"
          onClick={() => onAddUpdateAgentModalClose()}
        >
          <IntlMessages id="button.close" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageViewerModal;
