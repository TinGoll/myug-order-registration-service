import React, { FC } from "react";
import { Box, BoxProps, Typography, useTheme } from "@mui/material";

// Контейнер
const Root = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={[
        {
          width: {
            xs: "100%",
          },

          position: "relative",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: {
            sm: "1fr",
            md: "1fr minmax(250px, 1fr)",
          },
          gridTemplateRows: {
            sm: "250px minmax(250px, 1fr)",
            md: "1fr",
          },
        },
      ]}
    />
  );
};

// Картинка
interface ImageProps {}
const Image: FC<ImageProps> = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        display: {
          xs: "none",
          sm: "initial",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background: `rgba(256, 256, 256, 0.5)`,
          }}
        >
          <Typography fontWeight={500} variant='h6' textAlign='center'>
            <span>M</span>assiv Yug
          </Typography>
          <Typography textAlign='center' fontWeight={400} variant='h6'>
            Accounting system
          </Typography>
        </Box>
      </Box>
      <img src='/images/auth-form/logo_bg2.jpg' loading='lazy' alt='' />
    </Box>
  );
};

const AuthForm = {
  Root,
  Image,
};

export default AuthForm;
