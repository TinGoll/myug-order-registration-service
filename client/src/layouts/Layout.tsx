import React, { FC } from "react";
import Header from "../blocks/header/Header";
import Footer from "../blocks/footer/Footer";
import { Box, SxProps } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  sx?: SxProps;
  headerSticky?: boolean;
  bgcolor?: string;
}

const Layout: FC<Props> = ({ children, headerSticky, bgcolor }) => {
  return (
    <React.Fragment>
      <Header stickyforce={String(headerSticky)} />
      <Box sx={{ bgcolor: bgcolor }} component='main'>
        {children}
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
