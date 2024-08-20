import { useState } from "react";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarData {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

interface UseSnackbarReturn {
  snackbar: JSX.Element;
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
}

export default function useSnackbar(
  autoHideDuration: number = 6000
): UseSnackbarReturn {
  const [snackbarData, setSnackbarData] = useState<SnackbarData>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: SnackbarSeverity) => {
    setSnackbarData({
      open: true,
      message,
      severity,
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
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData.severity}
        sx={{ width: "100%" }}
      >
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );

  return { snackbar, showSnackbar };
}
