import { Box, Button, IconButton, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import DocumentHeader from "../document-header/document-header";
import OrderHeader from "../order-header/order-header";
import OrderInput from "../order-input/order-input";
import OrderList from "../order-list/order-list";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createOrder, setOrder } from "../../../store/slices/order.slice";
import CloseIcon from "@mui/icons-material/Close";
import { useHdbkQuery } from "../../../store/api/hdbk.api";
import { orderSaveThunk } from "../../../store/thunks/order/save-order.thunk";
import { LoadingButton } from "@mui/lab";

const OrderForm = () => {
  const { data: hdbk, isLoading } = useHdbkQuery();
  const orderForm = useAppSelector((state) => state.orderForm);
  const author = useAppSelector((state) => state.authorization.person!);
  const dispatch = useAppDispatch();

  const theme = useTheme();

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

  const handleSaveOrder = () => {
    // От правка заказа на сервер.
    if (!orderForm.order) {
      return;
    }
    dispatch(orderSaveThunk(orderForm.order));
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
      <Paper
        elevation={1}
        sx={{ padding: 2, mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Box>
          <Typography
            py={1}
            px={3}
            bgcolor={theme.palette.background.paper}
            boxShadow='1px 1px 2px 0px rgba(34, 60, 80, 0.3) inset'
            fontSize={15}
            fontWeight={500}
            color={theme.palette.secondary.main}
            display={orderForm.saved ? "initial" : "none"}
          >
            Заказ не сохранен!
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
          <LoadingButton
            onClick={handleSaveOrder}
            disabled={!orderForm.saved}
            loading={orderForm.loading}
            loadingIndicator='Отправка...'
            variant='contained'
            color='success'
          >
            Отправить заказ
          </LoadingButton>
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
              <OrderInput data={hdbk?.nomenclatures} index={index} />
            </Paper>
            <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
              <OrderList index={index} elements={document.elements} />
            </Paper>
          </React.Fragment>
        ))}
    </>
  );
};

export default OrderForm;
