import { DeleteForever } from "@mui/icons-material";
import { Box, styled, alpha, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { FC } from "react";

export const GridButton = styled("button")(({ color, theme }) => ({
  width: 24,
  height: 24,
  padding: 0,
  margin: 0,
  borderRadius: "50%",
  backgroundColor: "inherit",
  border: "none",
  borderColor: theme.palette["primary"].main,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ["&:hover"]: {
    backgroundColor: theme.palette.background.paper,
  },
  ":active": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
  },
}));

interface Props {
  onDelete: (id: string) => void;
  params: GridRenderCellParams<any, any, any>;
}

const DataGridActions: FC<Props> = ({ onDelete, params }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
      <Tooltip title='Удалить строку'>
        <GridButton color='danger' onClick={() => onDelete(String(params.id))}>
          <DeleteForever
            sx={(theme) => ({
              color: alpha(theme.palette.primary.main, 0.5),
              fontSize: 22,
              ":hover": {
                color: theme.palette.secondary.main,
              },
            })}
          />
        </GridButton>
      </Tooltip>
    </Box>
  );
};

export default DataGridActions;
