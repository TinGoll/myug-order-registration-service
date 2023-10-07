import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../layouts/Layout";
import { Container } from "@mui/material";
import OrderForm from "../blocks/order-form/order-form/order-form";
import { useAppSelector } from "../store/hooks";
import AuthPage from "../blocks/auth-form/auth-page";

const IndexPage: React.FC<PageProps> = ({ uri }) => {
  const authorized = useAppSelector((state) => state.authorization.authorized);

  if (!authorized) {
    return <AuthPage />;
  }


  
  return (
    <Layout headerSticky sx={{}}>
      <Container>
        <OrderForm />
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Форма заказа</title>;
