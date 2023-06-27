import { Grid } from "@mui/material";
import React from "react";
import TextField from "../../../components/text-field/text-field";

const OrderHeader = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField fullWidth color="primary" label="Название Вашего заказа" />
      </Grid>
      <Grid item xs={8}>
        <TextField fullWidth color="primary" label="Комментарий к заказу" />
      </Grid>
    </Grid>
  );
};

export default OrderHeader;
