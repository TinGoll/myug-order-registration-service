import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import SvgMYugLogo from "../assets/svg/logo/myug-logo";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  // Override media queries injected by theme.mixins.toolbar
}));

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header = () => {
  return (
    <Box component='header' sx={{ flexGrow: 1 }}>
      <AppBar component='nav' position='fixed' sx={{}}>
        <Container>
          <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
              <SvgMYugLogo />
            </IconButton>
  
            <Typography
              variant='h4'
              noWrap
              component='div'
              textTransform='uppercase'
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, fontFamily: "Orchidea Pro" }}
            >
              Массив-юг
            </Typography>
            {/* <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              MUI
            </Typography> */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder='Search…' inputProps={{ "aria-label": "search" }} />
            </Search>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </Box>
  );
};

export default Header;
