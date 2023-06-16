import React, { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, SxProps } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  sx?: SxProps;
  headerSticky?: boolean;
}

const Layout: FC<Props> = ({ children, headerSticky }) => {
  return (
    <React.Fragment>
      <Header stickyforce={String(headerSticky)} />
      <Box component='main'>{children}</Box>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
