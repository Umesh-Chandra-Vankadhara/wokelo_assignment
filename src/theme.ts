//* eslint-disable import/no-mutable-exports */
import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    hover?: string;
    divider?: string;
  }
  interface SimplePaletteColorOptions {
    hover?: string;
    divider?: string;
  }
}
const theme: Theme = createTheme({
  palette: {
    primary: { main: "#583BE8" },
    secondary: {
      main: "#0f4c75",
      hover: "#1f557c",
    },
    text: {
      primary: "#000000",
      secondary: "#949494",
      disabled: "#C2C9D1",
    },
    grey: {
      500: "#5C5F62",
    },
    success: {
      main: "#65B168",
      light: "#EDF6EE",
    },
    error: {
      main: "#FC5050",
      light: "#FFEFEF",
    },
    warning: {
      main: "#FFA224",
      light: "#FDF8EB",
    },
    info: {
      main: "#2E6ADD",
      light: "#E7EFF9",
    },
    background: {
      default: "#F4F5F7",
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "13px",
        },
        body: {
          fontSize: "1rem",
          background: "#ffffff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxSizing: "border-box",
          height: "34px",
          "&.MuiInputBase-multiline": {
            height: "auto !important",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
          height: "34px",
          lineHeight: "34px",
          borderRadius: "6px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          boxSizing: "border-box",
          height: "40px",
          fontWeight: 700,
          fontSize: "20px",
          width: "max-content",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          boxSizing: "border-box",
          height: 34,
          lineHeight: "34px",
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          fontWeight: 400,
          fontStyle: "normal",
        },
      },
    },
  },
});
export default theme;
