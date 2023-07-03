import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#E9345B",
    },
    error: {
      main: "#c71668",
    },
    warning: {
      main: "#DC9D00",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 90,
      "@media (min-width:600px)": {
        minHeight: 138,
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
