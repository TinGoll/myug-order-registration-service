import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, SxProps } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  sx?: SxProps;
}

function Layout(props: Props) {
  return (
    <React.Fragment>
      <Header />
      <Box component='main' sx={{ pt: 8 }}>
        {props.children}
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
