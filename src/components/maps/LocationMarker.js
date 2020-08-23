import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles((theme) => ({
  marker: {
    color: "red",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
}));

const LocationMarker = () => {
  const classes = useStyles();
  return <RoomIcon className={classes.marker} fontSize="large" />;
};

export default LocationMarker;
