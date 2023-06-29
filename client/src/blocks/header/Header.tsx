import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Container,
  useScrollTrigger,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import React, { FC } from "react";
import SvgMYugLogo from "../../assets/svg/logo/myug-logo";

interface ISticky {
  sticky?: string;
  stickyforce?: string;
}

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 32,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sticky: trigger ? "true" : "false",
  });
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // border: `0.08em solid ${alpha(theme.palette.primary.main, 0.25)}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({}));

const StyledAppBar = styled(AppBar)<ISticky>(({ theme, sticky, stickyforce }) => ({
  background: stickyforce === "true" || sticky === "true" ? undefined : "none transparent",
  transition: theme.transitions.create(["background"], {
    duration: theme.transitions.duration.standard,
  }),
  // color: stickyforce === "true" || sticky === "true" ? "white" : theme.palette.primary.main,
}));

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header: FC<ISticky> = ({ stickyforce }) => {
  const goHomeHandler = () => {
    console.log("Реализация перехода на главную");
  };

  return (
    <Box component='header' sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <StyledAppBar stickyforce={String(stickyforce)} position='fixed'>
          <Container>
            <StyledToolbar>
              <IconButton
                onClick={goHomeHandler}
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                sx={{ mr: 2 }}
              >
                <SvgMYugLogo />
              </IconButton>
              <Box
                onClick={goHomeHandler}
                sx={{
                  mr: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  paddingTop: 2,
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant='h4'
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
                    fontSize: 10,
                    color: theme.palette.grey[400],
                  })}
                >
                  от идеи до воплощения в каждой мелочи
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}></Box>



              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Search…' inputProps={{ "aria-label": "search" }} />
              </Search> */}
            </StyledToolbar>
          </Container>
        </StyledAppBar>
      </ElevationScroll>
      <Offset />
    </Box>
  );
};

export default Header;
