import * as React from "react";
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { columns } from "./order-list-columns";
import StyledDataGrid from "./styled-data-grid";

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

const rows = [
  { id: 1, num: 1, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 5, comment: "" },
  { id: 2, num: 2, nomenclature: "Фасад глухой", height: 716, width: 396, amount: 1, comment: "" },
  { id: 3, num: 3, nomenclature: "Фасад Витрина", height: 596, width: 396, amount: 1, comment: "" },
  { id: 4, num: 4, nomenclature: "Фасад Витрина", height: 596, width: 596, amount: 2, comment: "" },
  { id: 5, num: 5, nomenclature: "Фасад глухой", height: 916, width: 446, amount: 3, comment: "" },
  { id: 6, num: 6, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
  { id: 7, num: 7, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 4, comment: "" },
  { id: 8, num: 8, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
  { id: 9, num: 9, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
  { id: 10, num: 10, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
  { id: 11, num: 11, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
  { id: 12, num: 12, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
  { id: 13, num: 13, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
  { id: 14, num: 14, nomenclature: "Фасад глухой", height: 916, width: 396, amount: 2, comment: "" },
];

export default function OrderList() {
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
