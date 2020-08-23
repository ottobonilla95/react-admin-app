import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoaderButton = ({ children, loading, actionClick, classNameButton, disabled }) => {
  return (
    <div style={{ display: "inline-flex", position: "relative" }}>
      <Button
        variant="contained"
        className={loading || disabled ? "" : classNameButton}
        disabled={loading || disabled}
        onClick={actionClick}
        style={{ width: "100%" }}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -12,
            marginLeft: -12,
          }}
        />
      )}
    </div>
  );
};

export default LoaderButton;
