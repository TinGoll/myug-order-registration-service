import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../layouts/Layout";
import { Box, Container } from "@mui/material";
import TextField from "../components/TextField/text-field";

import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "../components/Autocomplete/autocomplete";

const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) => `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`
);

const IndexPage: React.FC<PageProps> = ({ uri }) => {


  return (
    <Layout headerSticky sx={{}}>
      <Container>
        <Box>Lorem ipsum dolor sit amet.</Box>
        <InputLabel>Lorem, ipsum dolor.</InputLabel>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField color='error' label='Привет' />
          <Autocomplete
            id='disabled-options-demo'
            options={timeSlots}
            color='info'
            label='Привет'
            getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
          />
        </Box>
        {/* <TextField color='info' /> */}
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Форма заказа</title>;
