import { FormControlLabel, Grid } from "@mui/material";
import React, { memo, useState } from "react";

import Switch from "../../../components/switch/switch";
import ElementWrapper from "../../../components/element-wrapper/element-wrapper";
import Autocomplete from "../../../components/styled-autocomplete/autocomplete";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import OrderTypes from "../../../types/order-types";
import { updateDocument } from "../../../store/slices/order.slice";

const materials: OrderTypes.Material[] = [
  {
    id: 1,
    name: "Дуб",
    type: "Твердая порода",
  },
  {
    id: 2,
    name: "Ольха",
    type: "Мягкая порода",
  },
];
const DocumentHeader = () => {
  const [value, setValue] = useState(null);

  const order = useAppSelector((state) => state.orderForm.order);
  const dispatch = useAppDispatch();

  const handleChange = (index: number, document: Partial<OrderTypes.UpdateDocumentInput> = {}) => {
    dispatch(
      updateDocument({
        index,
        document,
      })
    );
  };

  console.log("doc", order?.documents[0]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Autocomplete
          id='autocomplete-material'
          value={order?.documents[0]?.material || null}
          onChange={(event: any, material: OrderTypes.Material) => {
            handleChange(0, { material });
          }}
          getOptionLabel={(option: OrderTypes.Material) => option.name}
          options={materials}
          color='primary'
          label='Материал'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='autocomplete-model'
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          options={materials}
          color='primary'
          label='Модель'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='autocomplete-panel'
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          options={materials}
          color='primary'
          label='Модель филёнки'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='autocomplete-color'
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          options={materials}
          color='primary'
          label='Цвет'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='autocomplete-patina'
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          options={materials}
          color='primary'
          label='Патина'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='autocomplete-texture'
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          options={materials}
          color='primary'
          label='Текстура'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='autocomplete-gloss'
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          options={materials}
          color='primary'
          label='Глянцевость'
        />
      </Grid>
      <Grid item xs={4}>
        <ElementWrapper>
          <FormControlLabel
            labelPlacement='end'
            label='Термошов'
            sx={{ flex: 1 }}
            control={<Switch defaultChecked={false} color='success' />}
          />
        </ElementWrapper>
      </Grid>
    </Grid>
  );
};

export default memo(DocumentHeader);
