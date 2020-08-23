/**
 * Animated Dialog
 */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LoaderButton from "../buttons/LoaderButton";
import IntlMessages from "../../utils/IntlMessages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class ConfirmDialogSlide extends React.Component {
  handleClose = () => {
    if (this.props.loading) {
      return;
    }
    this.props.closeDialog();
  };
  onAcept = () => {
    this.props.onAcept();
  };

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {this.props.tittle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={this.handleClose}
            className={this.props.loading ? "" : "btn-danger text-white"}
            disabled={this.props.loading}
          >
            <IntlMessages id="button.cancel" />
          </Button>

          <LoaderButton
            classNameButton="text-white btn-success"
            actionClick={this.onAcept}
            loading={this.props.loading}
          >
            <IntlMessages id="button.accept" />
          </LoaderButton>
        </DialogActions>
      </Dialog>
    );
  }
}
