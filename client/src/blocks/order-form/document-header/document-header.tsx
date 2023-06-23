import { Grid, Paper } from "@mui/material";
import React from "react";
import Autocomplete from "../../../components/autocomplete/autocomplete";

const DocumentHeader = () => {
  const materials = ["Дуб", "Ольха"];

  return (
    <Paper elevation={1} sx={{ padding: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete id='autocomplete-material' options={materials} color='primary' label='Тест' />
        </Grid>
        <Grid item xs={8}>
          <Autocomplete id='autocomplete-material' options={materials} color='primary' label='Тест' />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete id='autocomplete-material' options={materials} color='primary' label='Тест' />
        </Grid>
        <Grid item xs={8}>
          <Autocomplete id='autocomplete-material' options={materials} color='primary' label='Тест' />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DocumentHeader;
