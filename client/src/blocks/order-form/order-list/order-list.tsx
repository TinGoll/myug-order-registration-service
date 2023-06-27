// const OrderList = () => {
//   return <Box>OrderList</Box>;
// };

// export default OrderList;

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Theme, alpha, styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

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
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${theme.palette.mode === "light" ? "#f0f0f0" : "#303030"}`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${theme.palette.mode === "light" ? "#f0f0f0" : "#303030"}`,
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

  ...customCheckbox(theme),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color='primary'
      variant='outlined'
      shape='rounded'
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) => apiRef.current.setPage(value - 1)}
    />
  );
}

const PAGE_SIZE = 20;

const columns: GridColDef[] = [
  {
    field: "num",
    headerName: "№",
    width: 30,
    headerAlign: "center",
    align: "center",
    description: "Порядковый номер",
  },
  {
    field: "nomenclature",
    headerName: "Номенклатура",
    width: 250,
    editable: true,
    headerAlign: "center",
    description: "Номенклатура заказа",
  },
  {
    field: "height",
    headerName: "Высота",
    width: 80,
    editable: true,
    headerAlign: "center",
    align: "center",
    description: "Высота элемента заказа",
  },
  {
    field: "width",
    headerName: "Ширина",
    width: 80,
    editable: true,
    headerAlign: "center",
    align: "center",
    description: "Ширина элемента заказа",
  },
  {
    field: "amount",
    headerName: "Кол-во",
    width: 80,
    editable: true,
    headerAlign: "center",
    align: "center",
    description: "Количество",
  },
  {
    field: "comment",
    headerName: "Комментарий",
    description: "Комментарий к элементу заказа.",
    sortable: false,
    flex: 1,
    headerAlign: "center",
    valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, num: 1, nomenclature: "Snow", height: 916, width: 396, amount: 2, comment: "" },
  { id: 2, num: 2, nomenclature: "Lannister", height: 916, width: 396, amount: 2, comment: "" },
  { id: 3, num: 3, nomenclature: "Lannister", height: 916, width: 396, amount: 2, comment: "" },
  { id: 4, num: 4, nomenclature: "Stark", height: 916, width: 396, amount: 2, comment: "" },
  { id: 5, num: 5, nomenclature: "Targaryen", height: 916, width: 396, amount: 2, comment: "" },
  { id: 6, num: 6, nomenclature: "Melisandre", height: 916, width: 396, amount: 2, comment: "" },
  { id: 7, num: 7, nomenclature: "Clifford", height: 916, width: 396, amount: 2, comment: "" },
  { id: 8, num: 8, nomenclature: "Frances", height: 916, width: 396, amount: 2, comment: "" },
  { id: 9, num: 9, nomenclature: "Roxie", height: 916, width: 396, amount: 2, comment: "" },
];

export default function AntDesignGrid() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 12,
    maxColumns: 6,
  });

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <StyledDataGrid
        color='primary'
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        rowHeight={32}
        slots={{
          pagination: CustomPagination,
        }}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}
