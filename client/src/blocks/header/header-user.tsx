import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Theme, alpha } from "@mui/material";
import React from "react";
import Person3Icon from "@mui/icons-material/Person3";
import Person4Icon from "@mui/icons-material/Person4";
import VerifiedIcon from "@mui/icons-material/Verified";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserInitiatives } from "../../features/get-user-initiatives/get-user-initiatives";
import { logout } from "../../store/slices/authorization.slice";
import { Role } from "../../types/roles.enum";

type Setting = "Выход";

const settings: Setting[] = ["Выход"];

const getIcon = (role: Role): React.JSX.Element => {
  switch (role) {
    case Role.ADMIN:
      return <VerifiedIcon />;
    case Role.MANAGER:
      return <ManageAccountsIcon />;
    case Role.CLIENT:
      return <Person3Icon />;
    default:
      return <Person4Icon />;
  }
};

const getIconColor = (role: Role, theme: Theme): string => {
  switch (role) {
    case Role.ADMIN:
      return "#008AA4";
    case Role.MANAGER:
      return "#338309";
    case Role.CLIENT:
      return theme.palette.secondary.main;
    default:
      return theme.palette.secondary.main;
  }
};

const getRole = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
      return `Администратор`;
    case Role.MANAGER:
      return `Менеджер`;
    default:
      return ``;
  }
};

const HeaderUser = () => {
  const user = useAppSelector((state) => state.authorization.person);
  const dispatch = useAppDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickUserMenu = (item: Setting) => {
    handleCloseUserMenu();
    switch (item) {
      case "Выход":
        dispatch(logout());
        break;

      default:
        break;
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box
      sx={{
        flexGrow: 0,
        display: user ? "flex" : "none",
        flexDirection: "row",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={(theme) => ({
          cursor: "pointer",
          display: {
            xs: "none",
            md: "initial",
          },
        })}
        onClick={handleOpenUserMenu}
      >
        <Typography variant='body2' textTransform='uppercase' color='white' textAlign='right'>
          {getUserInitiatives(user?.firstName || "", user?.lastName, user?.middleName)}
        </Typography>
        {(user?.role === Role.ADMIN || user?.role === Role.MANAGER) && (
          <Typography fontSize={11} color='gray' textAlign='right'>
            {`(${getRole(user?.role)})`}
          </Typography>
        )}
      </Box>
      <Tooltip title={`${user?.lastName} ${user?.firstName} ${user?.middleName}`}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt='Remy Sharp'
            sx={(theme) => ({
              bgcolor: getIconColor(user!.role, theme),
              boxShadow:
                user?.role === Role.CLIENT
                  ? "none"
                  : `${alpha(getIconColor(user!.role, theme), 0.35)} 0 0 0.1rem 0.2rem`,
            })}
          >
            {getIcon(user!.role)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleClickUserMenu(setting)}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default HeaderUser;
