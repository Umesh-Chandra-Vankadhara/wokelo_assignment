import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Navigation } from "./routes";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
