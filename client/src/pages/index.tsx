import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../layouts/Layout";
import { Badge, Box, Container, FormControlLabel, Paper } from "@mui/material";
import TextField from "../components/text-field/text-field";

import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "../components/autocomplete/autocomplete";
import Switch from "../components/switch/switch";
import OrderForm from "../blocks/order-form/order-form/order-form";

const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) => `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`
);

const IndexPage: React.FC<PageProps> = ({ uri }) => {
  return (
    <Layout headerSticky sx={{}}>
      <Container>
        <OrderForm />

        {/* <Box>Lorem ipsum dolor sit amet.</Box>
        <InputLabel>Lorem, ipsum dolor.</InputLabel>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 128,
                height: 128,
              },
            }}
          >
            <Paper elevation={0} />
            <Paper />
            <Paper elevation={3} />
          </Box>
          <TextField color='secondary' label='Тест TextField' />
          <TextField color='primary' label='Тест TextField' />
          <TextField color='success' label='Тест TextField' />

          <TextField color='error' label='Тест TextField' />

          <Autocomplete
            id='disabled-options-demo'
            options={timeSlots}
            color='primary'
            label='Тест'
            getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
          />
          <FormControlLabel labelPlacement='end' label='Присадка' control={<Switch defaultChecked color='error' />} />
          <FormControlLabel labelPlacement='end' label='Присадка' control={<Switch defaultChecked color='info' />} />
          <FormControlLabel
            labelPlacement='end'
            label='Присадка'
            control={<Switch defaultChecked color='secondary' />}
          />
          <FormControlLabel labelPlacement='end' label='Присадка' control={<Switch defaultChecked color='primary' />} />
        </Box> */}
        {/* <TextField color='info' /> */}
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Форма заказа</title>;
