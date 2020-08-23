import React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";

// IntlMessages
import IntlMessages from "../../utils/IntlMessages";

// components
import GoogleMapComponent from "../maps/GoogleMapComponent";
import LocationMarker from "../maps/LocationMarker";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "350px",
    width: "100%",
    backgroundColor: "lightgray",
    padding: "3px",
  },
}));

const LocationViewerModal = (props) => {
  const classes = useStyles();

  //  close modal
  const closeModal = () => {
    props.closeModal();
  };

  return (
    <Modal isOpen={props.position !== undefined} toggle={() => closeModal()}>
      <ModalHeader toggle={() => closeModal()}>
        <IntlMessages id="tittle.locationPicker" />
      </ModalHeader>
      <ModalBody>
        <div className={classes.wrapper}>
          <GoogleMapComponent>
            {props.position && (
              <LocationMarker
                lat={props.position.lat}
                lng={props.position.lng}
                text="Position"
              />
            )}
          </GoogleMapComponent>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="contained"
          className="text-white btn-danger"
          onClick={() => closeModal()}
        >
          <IntlMessages id="button.close" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LocationViewerModal;
