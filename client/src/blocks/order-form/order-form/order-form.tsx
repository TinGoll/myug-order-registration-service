import { Box } from "@mui/material";
import React from "react";
import DocumentHeader from "../document-header/document-header";
import OrderHeader from "../order-header/order-header";

const OrderForm = () => {
  return (
    <>
      <OrderHeader />
      <DocumentHeader />
    </>
  );
};

export default OrderForm;
