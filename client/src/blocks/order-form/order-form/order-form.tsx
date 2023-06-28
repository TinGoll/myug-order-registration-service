import { Paper } from "@mui/material";
import React from "react";
import DocumentHeader from "../document-header/document-header";
import OrderHeader from "../order-header/order-header";
import OrderInput from "../order-input/order-input";
import OrderList from "../order-list/order-list";

const OrderForm = () => {
  return (
    <>
      <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
        <OrderHeader />
      </Paper>
      <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
        <DocumentHeader />
      </Paper>

      <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
        <OrderInput />
      </Paper>
      <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
        <OrderList />
      </Paper>
    </>
  );
};

export default OrderForm;
