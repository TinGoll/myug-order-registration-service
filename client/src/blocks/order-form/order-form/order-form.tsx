import { Box, Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import DocumentHeader from "../document-header/document-header";
import OrderHeader from "../order-header/order-header";
import OrderInput from "../order-input/order-input";
import OrderList from "../order-list/order-list";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createOrder, setOrder } from "../../../store/slices/order.slice";
import CloseIcon from "@mui/icons-material/Close";
import { useHdbkQuery } from "../../../store/api/hdbk.api";

const OrderForm = () => {
  const { data: hdbk, isLoading } = useHdbkQuery();
  const orderForm = useAppSelector((state) => state.orderForm);
  const author = useAppSelector((state) => state.authorization.person!);
  const dispatch = useAppDispatch();

  const order = orderForm.order;
  const documents = order?.documents;

  const handleCreateOrder = () => {
    dispatch(
      createOrder({
        author,
        documentType: "Фасады",
      })
    );
  };

  const handleCloseOrder = () => {
    dispatch(setOrder(null));
  };

  if (!order) {
    return (
      <>
        <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
          <Typography variant='h5'>Lorem ipsum dolor sit.</Typography>
          <Typography variant='body1' mt={2}>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae animi unde omnis totam provident culpa
            tempore nostrum possimus cumque neque.{" "}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            <Button onClick={handleCreateOrder} color='secondary'>
              Создать новый заказ
            </Button>
          </Box>
        </Paper>
      </>
    );
  }

  return (
    <>
      <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
          <Button variant='contained' color='success'>
            Отправить заказ
          </Button>
          <Button onClick={handleCreateOrder} color='warning'>
            Очистить форму
          </Button>
          <Tooltip title='Закрыть текущий заказ'>
            <IconButton onClick={handleCloseOrder} color='secondary'>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
        <OrderHeader order={order} />
      </Paper>
      {documents?.length &&
        documents.map((document, index) => (
          <React.Fragment key={document.key}>
            <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
              <DocumentHeader index={index} document={document} data={hdbk} isLoading={isLoading} />
            </Paper>
            <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
              <OrderInput />
            </Paper>
            <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
              <OrderList elements={document.elements} />
            </Paper>
          </React.Fragment>
        ))}
    </>
  );
};

export default OrderForm;
