import * as React from "react";
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, ruRU } from "@mui/x-data-grid";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import StyledDataGrid from "./styled-data-grid";
import { memo } from "react";
import OrderTypes from "../../../types/order-types";
import { Box } from "@mui/material";
import { getColumns } from "./order-list-columns";
import { useAppDispatch } from "../../../store/hooks";
import { removeElement } from "../../../store/slices/order.slice";

interface IRow {
  id: string | number;
  num: number;
  nomenclature: string;
  height: number | string;
  width: number | string;
  amount: number | string;
  comment: string;
}

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
      renderItem={(props2) => <PaginationItem {...props2} />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) => apiRef.current.setPage(value - 1)}
    />
  );
}

const PAGE_SIZE = 5;

interface Props {
  elements?: OrderTypes.Element[];
  index: number;
}

function OrderList({ elements = [], index, ...props }: Props) {
  const [rows, setRows] = React.useState<IRow[]>([]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const tempRows = elements
      .filter((element) => !element.willBeDeleted)
      .map((element, i) => {
        const cmp = element.components.find((c) => c.name === "geometry")?.data as OrderTypes.Geometry;
        const row: IRow = {
          id: element.key,
          num: i + 1,
          nomenclature: element.name,
          height: cmp?.height || 0,
          width: cmp?.width || 0,
          amount: cmp?.amount || 0,
          comment: element.note || "",
        };
        return row;
      });
    setRows(tempRows);
  }, [elements]);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  const handleDelete = (id: string) => {
    dispatch(
      removeElement({
        documentIndex: index,
        elementKey: id,
      })
    );
    console.log("Удалить ID", id);
  };

  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <StyledDataGrid
        color='primary'
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        rowHeight={32}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        slots={{
          pagination: CustomPagination,
        }}
        rows={rows}
        columns={getColumns(handleDelete)}
      />
    </Box>
  );
}

export default memo(OrderList);
