import { Box, FormControlLabel, Switch, alpha } from "@mui/material";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const ElementWrapper: FC<Props> = ({ children, color = "primary" }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        gap: 2,
        padding: "1px 14px",
        border: "1px solid",
        borderRadius: "4px",
        backgroundColor: alpha(theme.palette[color].main, 0.02),
        borderColor: alpha(theme.palette[color].main, 0.2),
        ":hover": {
          outline: `1px solid ${alpha(theme.palette[color].main, 0.3)}`,
          backgroundColor: alpha(theme.palette[color].main, 0.01),
        },
      })}
    >
      {children}
    </Box>
  );
};

export default ElementWrapper;
