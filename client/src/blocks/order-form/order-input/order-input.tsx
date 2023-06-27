import { Grid } from "@mui/material";
import React, { FC } from "react";
import Autocomplete from "../../../components/Autocomplete/autocomplete";
import TextField from "../../../components/text-field/text-field";

const opt = ["Глухой", "Витрина", "Решётка"];

interface Props {}
const OrderInput: FC<Props> = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Autocomplete
          id="nomenclature-input"
          autoSelect
          options={opt}
          color="success"
          label="Номенклатура"
        />
      </Grid>
      <Grid item xs={1}>
        <TextField fullWidth label="Высота" />
      </Grid>
      <Grid item xs={1}>
        <TextField fullWidth label="Ширина" />
      </Grid>

      <Grid item xs={1}>
        <TextField fullWidth label="Кол-во" />
      </Grid>
      <Grid item xs={5}>
        <TextField fullWidth />
      </Grid>
    </Grid>
  );
};

export default OrderInput;