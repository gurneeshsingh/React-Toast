import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContext } from "../context/ToastContext"


export default function Toast() {

    const { showToast, currentToast, saveCurrentToast, closeToast, isSavingCurrentToast } = useContext(ToastContext);
    // destructure fields from the current toast
    const { firstName, lastName, email } = currentToast;


    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={showToast}
                autoHideDuration={3000}
                onClose={closeToast}
                message={
                    <div>
                        <div>
                            {firstName} {lastName}
                        </div>
                        <div>{email}</div>
                    </div>
                }
                action={
                    <>
                        <Button
                            color="primary"
                            size="small"
                          disabled={isSavingCurrentToast}
                          onClick={saveCurrentToast}
                        >
                            {isSavingCurrentToast ? (<CircularProgress />) : "Like"}
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                          onClick={closeToast}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
        </div>
    );
}

