import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footerContainer: {
    backgroundColor: "lightgray",
    padding: 20,
    width: "100%",
    borderRadius:5
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <div className="rct-footer d-flex justify-content-between align-items-center">
      <div className={classes.footerContainer}>Footer</div>
    </div>
  );
};

export default Footer;
