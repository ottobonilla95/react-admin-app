import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

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

const LocationPickerModal = (props) => {
  const classes = useStyles();

  const [position, setPosition] = useState({});

  //  close modal
  const closeModal = () => {
    props.closeModal();
  };

  const onGoogleMapClick = ({ x, y, lat, lng, event }) => {
    setPosition({ lat, lng });
  };

  const onPositionChanged = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "lat") {
      setPosition({ lat: value, lng: position.lng });
    } else {
      setPosition({ lat: position.lat, lng: value });
    }
  };

  const savePosition = () => {
    if (position.lat && position.lng) {
      props.setPosition(position);
      props.closeModal();
    }
  };

  return (
    <Modal isOpen={props.isOpen} toggle={() => closeModal()}>
      <ModalHeader toggle={() => closeModal()}>
        <IntlMessages id="tittle.locationPicker" />
      </ModalHeader>
      <ModalBody>
        <div className={classes.wrapper}>
          <GoogleMapComponent onGoogleMapClick={onGoogleMapClick}>
            {position && (
              <LocationMarker
                lat={position.lat}
                lng={position.lng}
                text="Position"
              />
            )}
          </GoogleMapComponent>
        </div>
        <div>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="userName"><IntlMessages id="form.latitude" /></Label>
                <Input
                  type="number"
                  name="lat"
                  // placeholder="Latitude"
                  value={position.lat || ""}
                  onChange={onPositionChanged}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="userName"><IntlMessages id="form.longitude" /></Label>
                <Input
                  type="number"
                  name="lng"
                  // placeholder="Longitude"
                  value={position.lng || ""}
                  onChange={onPositionChanged}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="contained"
          className="text-white btn-success"
          onClick={() => savePosition()}
        >
          <IntlMessages id="button.save" />
        </Button>

        <Button
          variant="contained"
          className="text-white btn-danger"
          onClick={() => closeModal()}
        >
          <IntlMessages id="button.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LocationPickerModal;
