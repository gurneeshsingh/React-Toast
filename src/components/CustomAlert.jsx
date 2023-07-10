import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { ToastContext } from '../context/ToastContext';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomAlert() {

  const { showAlert, dismissAlert } = useContext(ToastContext);

  return (
    <>
      {showAlert?.visible && <Collapse in={showAlert?.visible}>
        <Alert severity={showAlert.severity} action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={dismissAlert}
            >
              <CloseIcon fontSize="inherit" />
          </IconButton>
          }>
         
          <AlertTitle>Error</AlertTitle>
          Sorry, the form could not be saved — Reason: <strong>{showAlert?.message}</strong>
        </Alert>
      </Collapse>}
    </>
  )
}
