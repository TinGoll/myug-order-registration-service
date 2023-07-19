import { Fab, FormControl, Grid } from "@mui/material";
import React, { FC, memo } from "react";
import Autocomplete from "../../../components/styled-autocomplete/autocomplete";
import TextField from "../../../components/text-field/text-field";
import OrderTypes from "../../../types/order-types";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../../store/hooks";
import { createElement } from "../../../store/slices/order.slice";
import { OrderElement } from "../../../entities/order";

interface IFormInput {
  nomenclature: OrderTypes.Nomenclature | null;
  height: string;
  width: string;
  amount: string;
  comment: string;
}

interface Props {
  index: number;
  data?: OrderTypes.Nomenclature[];
}

const OrderInput: FC<Props> = ({ data = [], index }) => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, resetField, setFocus } = useForm<IFormInput>({
    defaultValues: {
      nomenclature: null,
      height: "",
      width: "",
      amount: "",
      comment: "",
    },
  });

  const clear = () => {
    resetField("height");
    resetField("width");
    resetField("amount");
    resetField("comment");
    setFocus("nomenclature");
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { nomenclature, height, width, amount, comment } = data;
    if (!nomenclature) {
      return;
    }
    const orderElement = new OrderElement(nomenclature);
    orderElement.note = comment;
    const cmp = orderElement.components.find((c) => c.name === "geometry")?.data as OrderTypes.Geometry;
    if (cmp) {
      cmp.height = Number(height);
      cmp.width = Number(width);
      cmp.amount = Number(amount);
    }
    dispatch(
      createElement({
        index,
        element: orderElement,
      })
    );
    clear();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Controller
              rules={{
                required: true,
              }}
              name='nomenclature'
              control={control}
              render={({ field }) => {
                const { ref, onChange, onBlur, value, ...fieldProps } = field;
                return (
                  <Autocomplete
                    autoSelect
                    selectOnFocus
                    options={data}
                    color='primary'
                    label='Номенклатура'
                    {...fieldProps}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    onBlur={onBlur}
                    inputRef={ref}
                    getOptionLabel={(option: OrderTypes.Nomenclature) => option.name}
                    isOptionEqualToValue={(option: OrderTypes.Nomenclature, value: OrderTypes.Nomenclature) =>
                      option.id === value.id
                    }
                  />
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Controller
            rules={{
              required: true,
            }}
            name='height'
            control={control}
            render={({ field }) => {
              const { ref, ...fieldProps } = field;
              return <TextField {...fieldProps} inputRef={ref} fullWidth label='Высота' />;
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Controller
            rules={{
              required: true,
            }}
            name='width'
            control={control}
            render={({ field }) => {
              const { ref, ...fieldProps } = field;
              return <TextField {...fieldProps} inputRef={ref} fullWidth label='Ширина' />;
            }}
          />
        </Grid>

        <Grid item xs={1}>
          <Controller
            rules={{
              required: true,
            }}
            name='amount'
            control={control}
            render={({ field }) => {
              const { ref, ...fieldProps } = field;
              return <TextField {...fieldProps} inputRef={ref} fullWidth label='Кол-во' />;
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name='comment'
            control={control}
            render={({ field }) => {
              const { ref, ...fieldProps } = field;
              return <TextField {...fieldProps} inputRef={ref} fullWidth label='Комментарий' />;
            }}
          />
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
