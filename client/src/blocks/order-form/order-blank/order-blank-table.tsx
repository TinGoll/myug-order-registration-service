import React, { FC, useEffect, useState } from "react";
import OrderTypes from "../../../types/order-types";
import { TableContainer, Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface Props {
  elements?: OrderTypes.Element[];
}

interface IRow {
  key: string;
  number: number;
  nomenclature: string;
  height: string;
  width: string;
  amount: string;
  comment: string;
}

const OrderBlankTable: FC<Props> = ({ elements = [] }) => {
  const [rows, setRows] = useState<IRow[]>([]);

  useEffect(() => {
    const tempRows = elements.map<IRow>((element, index) => {
      const cmp = element.components.find((c) => c.name === "geometry")?.data as OrderTypes.Geometry;
      return {
        key: element.key,
        number: index + 1,
        nomenclature: element.name,
        height: String(cmp?.height) || "",
        width: String(cmp?.width) || "",
        amount: String(cmp?.amount) || "",
        comment: element?.note || "",
      };
    });
    setRows(tempRows);
  }, [elements]);

  return (
    <TableContainer
      component={Box}
      sx={(theme) => ({ border: "1px solid", borderColor: theme.palette.divider, borderRadius: "6px", mt: 2 })}
    >
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell width={36}>№</TableCell>
            <TableCell width='auto'>Номенклатура</TableCell>
            <TableCell width={80} align='center'>
              Высота
            </TableCell>
            <TableCell width={80} align='center'>
              Ширина
            </TableCell>
            <TableCell width={80} align='center'>
              Кол-во
            </TableCell>
            <TableCell align='left'>Комментарий</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align='center'>{row.number}</TableCell>
              <TableCell component='th' scope='row'>
                {row.nomenclature}
              </TableCell>
              <TableCell align='center'>{row.height}</TableCell>
              <TableCell align='center'>{row.width}</TableCell>
              <TableCell align='center'>{row.amount}</TableCell>
              <TableCell align='left'>{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderBlankTable;
