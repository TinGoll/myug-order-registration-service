import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";


// declare module "@mui/material/styles/createPalette" {
//   interface CommonColors {}
//   interface PaletteOptions {}
// }

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
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
      main: "#833d04",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
