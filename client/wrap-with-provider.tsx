import React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./src/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { GlobalStyles, ThemeProvider } from "@mui/material";

import theme from "./src/theme";

const wrapper = ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{}} />
        {element}
      </ThemeProvider>
    </Provider>
  );
};

export default wrapper;
