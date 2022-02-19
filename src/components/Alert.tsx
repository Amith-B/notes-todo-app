import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAlert, selectAlert } from "../store/reducers/commonSlice";

const AlertMessage = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export default function Alert() {
  const alert = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeAlert());
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
      <AlertMessage
        onClose={handleClose}
        severity={alert.type}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </AlertMessage>
    </Snackbar>
  );
}
