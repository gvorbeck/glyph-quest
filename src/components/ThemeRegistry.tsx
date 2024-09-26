"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";
import { amber } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true; // adds the `mobile` breakpoint
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: amber,
    secondary: {
      main: "#242120",
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
