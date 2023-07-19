import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataGridActions from "./data-grid-actions";

export const getColumns = (onDelete: (id: string) => void): GridColDef[] => [
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
    width: 200,
    editable: false,
    headerAlign: "center",
    description: "Номенклатура заказа",
  },
  {
    field: "height",
    headerName: "Высота",
    width: 70,
    editable: true,
    headerAlign: "center",
    align: "center",
    description: "Высота элемента заказа",
  },
  {
    field: "width",
    headerName: "Ширина",
    width: 70,
    editable: true,
    headerAlign: "center",
    align: "center",
    description: "Ширина элемента заказа",
  },
  {
    field: "amount",
    headerName: "Кол-во",
    width: 70,
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
    editable: true,
    // valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "actions",
    headerName: "",
    align: "center",
    sortable: false,
    editable: false,
    width: 25,
    renderCell(params) {
      return <DataGridActions params={params} onDelete={onDelete} />;
    },
  },
];
