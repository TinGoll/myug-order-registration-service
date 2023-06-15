import React, { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, SxProps } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  sx?: SxProps;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Box component='main'>{children}</Box>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
