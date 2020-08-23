import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StoreIcon from "@material-ui/icons/Store";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  marker: { position: "absolute", transform: "translate(-50%, -50%)" },
  iconButton: {
    backgroundColor: "rgb(255, 99, 99)",
    maxWidth: "25px",
    maxHeight: "25px",
    borderStyle: "solid",
    borderColor: "rgb(255, 59, 59)",
    borderWidth: "3px",
  },
}));

const CustomerMarker = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title={props.name || ""} className={classes.marker}>
        <IconButton
          aria-label="delete"
          onClick={handleClick}
          className={classes.iconButton}
        >
          <StoreIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography color="textSecondary">{props.mobile_number}</Typography>
            <Typography color="textSecondary">{props.email}</Typography>
            <Typography variant="body2" component="p">
              {props.state} - {props.country}
            </Typography>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default CustomerMarker;
