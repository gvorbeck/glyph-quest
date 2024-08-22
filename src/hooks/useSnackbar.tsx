import { useState } from "react";
import {
  Snackbar,
  Alert,
  SnackbarCloseReason,
  IconButton,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarData {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  action?: JSX.Element;
}

interface UseSnackbarReturn {
  snackbar: JSX.Element;
  showSnackbar: (
    message: string,
    severity: SnackbarSeverity,
    action?: JSX.Element
  ) => void;
}

export default function useSnackbar(
  autoHideDuration?: number
): UseSnackbarReturn {
  const [snackbarData, setSnackbarData] = useState<SnackbarData>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (
    message: string,
    severity: SnackbarSeverity,
    action?: JSX.Element
  ) => {
    setSnackbarData({
      open: true,
      message,
      severity,
      action,
    });
  };

  const handleClose = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarData((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const snackbar = (
    <Snackbar
      open={snackbarData.open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      action={snackbarData.action}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData.severity}
        sx={{ width: "100%" }}
        action={snackbarData.action}
      >
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );

  return { snackbar, showSnackbar };
}
