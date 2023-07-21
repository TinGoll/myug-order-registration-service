import React, { FC } from "react";
import OrderTypes from "../../../types/order-types";
import { Paper, Grid, Box, styled, Typography, Button, Chip } from "@mui/material";
import OrderBlankTable from "./order-blank-table";
import moment from "moment";
import { getUserInitiatives } from "../../../features/get-user-initiatives/get-user-initiatives";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAppDispatch } from "../../../store/hooks";
import { OrderState } from "../../../enums/order-state.enum";
import { setStateThunk } from "../../../store/thunks/order/set-state.thunk";

const HeaderItem = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;
const HeaderName = styled(Box)`
  min-width: 150px;
  text-align: left;
`;
const HeaderValue = styled(Box)`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  font-style: italic;
`;

const HeaderComment = styled(Box)`
  margin-top: 16px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.divider};
  border-radius: 6px;
  padding: 8px;
  text-align: left;
  font-style: italic;
  font-size: 0.95em;
`;

const OrderBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.palette.divider};
`;

interface Props {
  confirmed?: boolean;
  order: OrderTypes.Order;
  loading?: boolean;
}

const OrderBlank: FC<Props> = ({ order, confirmed, loading }) => {
  const dispatch = useAppDispatch();

  const handleSetState = (state: OrderState) => {
    dispatch(
      setStateThunk({
        id: order.id || 0,
        state,
      })
    );
  };

  return (
    <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
      <OrderBox sx={{ justifyContent: "space-between", mt: 2, py: 2 }}>
        <Typography>Заказ № "{order.clientNumner}"</Typography>
        <Typography>от {moment(order.createdAt).format("DD.MM.YYYY")}</Typography>
        <Typography>
          Заказчик:
          {getUserInitiatives(order.client?.firstName || "", order.client?.lastName, order.client?.middleName)}
        </Typography>
      </OrderBox>
      {order?.documents &&
        order?.documents.map((document) => (
          <React.Fragment key={document.key}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <HeaderItem>
                  <HeaderName>Материал:</HeaderName> <HeaderValue>{document.material?.name || "Не указан"}</HeaderValue>
                </HeaderItem>
              </Grid>
              <Grid item xs={6}>
                <HeaderItem>
                  <HeaderName>Модель:</HeaderName>
                  <HeaderValue>{document.facadeModel?.name || "Не указана"}</HeaderValue>
                </HeaderItem>
              </Grid>
              <Grid item xs={6}>
                <HeaderItem>
                  <HeaderName>Цвет:</HeaderName> <HeaderValue>{document.color?.name || "Не указан"}</HeaderValue>
                </HeaderItem>
              </Grid>
              <Grid item xs={6}>
                <HeaderItem>
                  <HeaderName>Патина:</HeaderName> <HeaderValue>{document.patina?.name || "Не указана"}</HeaderValue>
                </HeaderItem>
              </Grid>
              <Grid item xs={6}>
                <HeaderItem>
                  <HeaderName>Текстура:</HeaderName> <HeaderValue>{document.texture || "Не указана"}</HeaderValue>
                </HeaderItem>
              </Grid>
              <Grid item xs={6}>
                <HeaderItem>
                  <HeaderName>Термошов:</HeaderName> <HeaderValue>{document.thermalseam ? "Да" : "Нет"}</HeaderValue>
                </HeaderItem>
              </Grid>
            </Grid>
            {order.note && <HeaderComment>{order.note}</HeaderComment>}
            <OrderBlankTable elements={document?.elements} />
          </React.Fragment>
        ))}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
        <Chip
          color={confirmed ? "success" : "secondary"}
          icon={confirmed ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
          label={confirmed ? "Заказ подтвержден." : "Заказ не подтвержден."}
        />
        {!Boolean(confirmed) && (
          <Box>
            <Button onClick={() => handleSetState(OrderState.UNDER_EDITING)}>Редактировать</Button>
            <Button
              onClick={() => handleSetState(OrderState.UNDER_CONFIRMATION)}
              sx={{ ml: 1 }}
              variant='contained'
              color='success'
            >
              Подтвердить
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default OrderBlank;
