import { FormControlLabel, Grid } from "@mui/material";
import React, { FC, memo } from "react";

import Switch from "../../../components/switch/switch";
import ElementWrapper from "../../../components/element-wrapper/element-wrapper";
import Autocomplete from "../../../components/styled-autocomplete/autocomplete";
import { useAppDispatch } from "../../../store/hooks";
import OrderTypes from "../../../types/order-types";
import { updateDocument } from "../../../store/slices/order.slice";

const texture: OrderTypes.Textute[] = ["Витая", "Прямая"];

interface Props {
  document: OrderTypes.Document;
  index: number;
  data?: OrderTypes.Hdbk;
  isLoading?: boolean;
}
const DocumentHeader: FC<Props> = ({ document: orderDocument, index, data, isLoading }) => {
  const dispatch = useAppDispatch();

  const handleChange = (input: Partial<OrderTypes.UpdateDocumentInput> = {}) => {
    dispatch(
      updateDocument({
        index,
        document: input,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Autocomplete
          loading={isLoading}
          value={orderDocument.material || null}
          onChange={(_, newValue: OrderTypes.Material) => {
            handleChange({
              material: newValue,
            });
          }}
          options={data?.materials || []}
          getOptionLabel={(option: OrderTypes.Material) => {
            return option.name;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          color='primary'
          label='Материал'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          value={orderDocument.facadeModel || null}
          onChange={(_, newValue: OrderTypes.FacadeModel) => {
            handleChange({
              facadeModel: newValue,
            });
          }}
          options={data?.models || []}
          getOptionLabel={(option: OrderTypes.FacadeModel) => {
            return option.name;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          color='primary'
          label='Модель'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          value={orderDocument.panelModel || null}
          onChange={(_, newValue: OrderTypes.PanelModel) => {
            handleChange({
              panelModel: newValue,
            });
          }}
          options={data?.panels || []}
          getOptionLabel={(option: OrderTypes.PanelModel) => {
            return option.name;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          color='primary'
          label='Модель филёнки'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          value={orderDocument.color || null}
          onChange={(_, newValue: OrderTypes.Color) => {
            handleChange({
              color: newValue,
            });
          }}
          options={data?.colors || []}
          getOptionLabel={(option: OrderTypes.Color) => {
            return option.name;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          color='primary'
          label='Цвет'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          value={orderDocument.patina || null}
          onChange={(_, newValue: OrderTypes.Patina) => {
            handleChange({
              patina: newValue,
            });
          }}
          options={data?.patinas || []}
          getOptionLabel={(option: OrderTypes.Patina) => {
            return option.name;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          color='primary'
          label='Патина'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          value={orderDocument.texture || null}
          onChange={(_, newValue: OrderTypes.Textute) => {
            handleChange({
              texture: newValue,
            });
          }}
          options={texture}
          color='primary'
          label='Текстура'
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          value={orderDocument.varnish || null}
          onChange={(_, newValue: OrderTypes.Varnish) => {
            handleChange({
              varnish: newValue,
            });
          }}
          options={data?.varnishes || []}
          getOptionLabel={(option: OrderTypes.Varnish) => {
            return option.name;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
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
            control={
              <Switch
                checked={Boolean(orderDocument.thermalseam)}
                onChange={(event) =>
                  handleChange({
                    thermalseam: event.target.checked,
                  })
                }
                color='success'
              />
            }
          />
        </ElementWrapper>
      </Grid>
    </Grid>
  );
};

export default memo(DocumentHeader);
