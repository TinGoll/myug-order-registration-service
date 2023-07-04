import React, { FC } from "react";
import { Box, BoxProps, Typography, keyframes, styled, useTheme } from "@mui/material";

//@ts-ignore
import backgroundImage from "../../images/auth-form-background.jpg";
import SvgMYugLogo from "../../assets/svg/logo/myug-logo";

// Контейнер
const Root = (props: BoxProps) => {
  const theme = useTheme();
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
          borderColor: theme.palette.grey[500],
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

const bounce = keyframes`
   0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
`;

// image
const Image = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${bounce} 30s linear infinite;
`;

const ImgBox = styled(Box)`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  background-color: rgba(256, 256, 256, 0.5);
  user-select: none;
`;

// Картинка
interface ImageProps {}
const Logo: FC<ImageProps> = () => {
  return (
    <Box
      sx={{
        position: "relative",
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
        <ImgBox>
          <SvgMYugLogo />
          <Box
            sx={{
              mr: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              paddingTop: 2,
            }}
          >
            <Typography
              variant='h5'
              noWrap
              component='div'
              textTransform='uppercase'
              sx={{ display: { xs: "none", sm: "block" }, fontFamily: "Orchidea Pro" }}
            >
              Массив-юг
            </Typography>
            <Typography
              variant='caption'
              noWrap
              component='div'
              textTransform='uppercase'
              sx={(theme) => ({
                display: { xs: "none", sm: "block" },
                fontSize: 9,
                // color: theme.palette.grey[400],
              })}
            >
              от идеи до воплощения в каждой мелочи
            </Typography>
          </Box>
        </ImgBox>
      </Box>
      <Image alt='logo' src={backgroundImage} />
    </Box>
  );
};

const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 36px;
  & > * {
    width: 100%;
  }
`;

const AuthForm = {
  Root,
  Logo,
  Form,
};

export default AuthForm;
