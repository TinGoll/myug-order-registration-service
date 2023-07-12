import { Grid } from "@mui/material";
import React, { FC, memo } from "react";
import TextField from "../../../components/text-field/text-field";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import OrderTypes from "../../../types/order-types";
import { updateOrder } from "../../../store/slices/order.slice";

interface Props {
  order: OrderTypes.Order;
}
const OrderHeader: FC<Props> = ({ order }) => {
  const dispatch = useAppDispatch();

  const handleChange = (input: Partial<OrderTypes.UpdateOrderInput>) => {
    dispatch(updateOrder(input));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          value={order?.clientNumner || ""}
          onChange={(event) => handleChange({ clientNumner: event.target.value || "" })}
          fullWidth
          color='primary'
          label='Название Вашего заказа'
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          value={order?.note || ""}
          onChange={(event) => handleChange({ note: event.target.value || "" })}
          fullWidth
          color='primary'
          label='Комментарий к заказу'
        />
      </Grid>
    </Grid>
  );
};

export default memo(OrderHeader);
