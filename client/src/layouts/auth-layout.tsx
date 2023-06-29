import { Box, BoxProps, useTheme, styled } from "@mui/material";
import React from "react";

//@ts-ignore
import authBackgroundImage from "../images/auth-background.jpg";

const AuthLayout = styled(Box)`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: linear-gradient(to bottom, rgba(256, 256, 256, 1), rgba(0, 20, 50, 0.6)),
    url(${authBackgroundImage});
`;

export default AuthLayout;
