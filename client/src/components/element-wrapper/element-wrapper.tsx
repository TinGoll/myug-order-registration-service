import { Box, FormControlLabel, Switch, alpha } from "@mui/material";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const ElementWrapper: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        gap: 2,
        padding: "1px 14px",
        border: "1px solid",
        borderRadius: "4px",
        backgroundColor: alpha(theme.palette["primary"].main, 0.02),
        borderColor: alpha(theme.palette["primary"].main, 0.2),
      })}
    >
      {children}
    </Box>
  );
};

export default ElementWrapper;
