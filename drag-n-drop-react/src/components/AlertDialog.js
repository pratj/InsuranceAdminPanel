import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({openState,setOpenPopup}) {

    const handleClose = () => {
      setOpenPopup(false)
    };

  return (
    <div>   
      <Dialog
        open={openState}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Wrong Credentials"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Password or Email was wrong! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Try Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
