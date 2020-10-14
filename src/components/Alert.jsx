import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/actions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function AlertMessage(props) {
  const state = useSelector((state) => ({
    error: state.error,
    message: state.message,
  }));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (state.error || state.message) {
      setOpen(true);
    }
  }, [state.error, state.message]);
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(setError(null));
  };
  return state.error || state.message ? (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
      <Alert
        onClose={open}
        severity={state.error ? "error" : state.message ? "success" : ""}
        variant={"filled"}
      >
        {state.error ? state.error : state.message ? state.message : ""}
      </Alert>
    </Snackbar>
  ) : null;
}

export default AlertMessage;
