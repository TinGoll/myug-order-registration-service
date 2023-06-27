import { FormControlLabel, Grid, useTheme } from "@mui/material";
import React from "react";
import Autocomplete from "../../../components/Autocomplete/autocomplete";
import Switch from "../../../components/switch/switch";
import ElementWrapper from "../../../components/element-wrapper/element-wrapper";

const DocumentHeader = () => {
  const materials = ["Дуб", "Ольха"];

  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Autocomplete
          id="autocomplete-material"
          options={materials}
          color="primary"
          label="Материал"
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id="autocomplete-material"
          options={materials}
          color="primary"
          label="Модель"
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id="autocomplete-material"
          options={materials}
          color="primary"
          label="Модель филёнки"
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id="autocomplete-material"
          options={materials}
          color="primary"
          label="Цвет"
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id="autocomplete-material"
          options={materials}
          color="primary"
          label="Патина"
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id="autocomplete-material"
          options={materials}
          color="primary"
          label="Текстура"
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id="autocomplete-material"
          options={materials}
          color="primary"
          label="Глянцевость"
        />
      </Grid>
      <Grid item xs={4}>
        <ElementWrapper>
          <FormControlLabel
            labelPlacement="end"
            label="Термошов"
            sx={{ flex: 1 }}
            control={<Switch defaultChecked color="warning" />}
          />
        </ElementWrapper>
      </Grid>
    </Grid>
  );
};

export default DocumentHeader;
