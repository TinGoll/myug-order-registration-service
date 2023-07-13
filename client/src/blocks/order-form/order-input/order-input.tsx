import { Fab, FormControl, Grid, IconButton, styled } from "@mui/material";
import React, { FC, memo, useState } from "react";
import Autocomplete from "../../../components/styled-autocomplete/autocomplete";
import TextField from "../../../components/text-field/text-field";
import OrderTypes from "../../../types/order-types";

import AddIcon from "@mui/icons-material/Add";

interface Props {
  data?: OrderTypes.Nomenclature[];
}
const OrderInput: FC<Props> = ({ data = [] }) => {
  const [nomenclature, setNomenclature] = useState<OrderTypes.Nomenclature | null>(null);
  const [height, setHeight] = useState<number | null>(0);
  const [width, setWidth] = useState<number | null>(0);
  const [amount, setAmount] = useState<number | null>(0);
  const [comment, setComment] = useState<string | null>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Привет");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Autocomplete
              autoSelect
              options={data}
              color='primary'
              label='Номенклатура'
              value={nomenclature}
              onChange={(_, newValue) => setNomenclature(newValue)}
              getOptionLabel={(option: OrderTypes.Nomenclature) => option.name}
              isOptionEqualToValue={(option: OrderTypes.Nomenclature, value: OrderTypes.Nomenclature) =>
                option.id === value.id
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth>
            <TextField
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
              fullWidth
              label='Высота'
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Ширина'
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
            />
          </FormControl>
        </Grid>

        <Grid item xs={1}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label='Кол-во'
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField fullWidth value={comment} onChange={(event) => setComment(String(event.target.value))} />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Fab type='submit' size='small' color='secondary' aria-label='add'>
              <AddIcon />
            </Fab>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(OrderInput);
