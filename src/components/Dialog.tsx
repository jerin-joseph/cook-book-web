import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDialog({ open, handleClose, text, actions }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{text?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {actions?.map((item, index) => {
            return (
              <Button onClick={item.action} key={index}>
                {item.text}
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
