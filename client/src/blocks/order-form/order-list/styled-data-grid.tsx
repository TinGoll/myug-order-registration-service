import { Theme, alpha, styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

type MaterialColor = "primary" | "secondary" | "error" | "info" | "success" | "warning";

function customCheckbox(theme: Theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"}`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after": {
      width: 8,
      height: 8,
      backgroundColor: "#1890ff",
      transform: "none",
      top: "39%",
      border: 0,
    },
  };
}

const StyledDataGrid = styled(DataGrid)<{ color?: MaterialColor }>(({ theme, color = "primary" }) => ({
  border: "1px solid",
  borderRadius: "4px",
  borderColor: alpha(theme.palette[color].main, 0.2),
  color: theme.palette.mode === "light" ? "rgba(0,0,0,.85)" : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
  },
  "& .MuiDataGrid-cell": {
    color: theme.palette.mode === "light" ? "rgba(0,0,0,.85)" : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .MuiDataGrid-cell:focus": {
    outline: `2px solid ${alpha(theme.palette[color].main, 0.2)}`,
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: alpha(theme.palette[color].main, 0.02),
  },
  "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
    boxShadow: `2px 2px 2px -2px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)`,
    backgroundColor: `#fff`,
  },

  ...customCheckbox(theme),
}));

export default StyledDataGrid;
