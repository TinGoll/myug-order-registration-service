import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../layouts/Layout";
import { Container } from "@mui/material";

const IndexPage: React.FC<PageProps> = ({ uri }) => {
  return (
    <Layout headerSticky sx={{}}>
      <Container>
       
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Форма заказа</title>;
