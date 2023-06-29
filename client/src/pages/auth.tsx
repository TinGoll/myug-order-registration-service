import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../layouts/Layout";
import { Box, Container } from "@mui/material";
import OrderForm from "../blocks/order-form/order-form/order-form";
import AuthLayout from "../layouts/auth-layout";
import AuthForm from "../blocks/auth-form/auth-form";

const IndexPage: React.FC<PageProps> = ({ uri }) => {
  return (
    <AuthLayout
      component='main'
      sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container sx={{ flex: 1 }}>
        <AuthForm.Root>
          <AuthForm.Image />
          <Box>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis corporis, voluptas vitae adipisci sit
            voluptatem aut voluptates sed molestias non recusandae blanditiis laboriosam beatae laudantium id nam nihil
            debitis suscipit?
          </Box>
        </AuthForm.Root>
      </Container>
      {/* <Container>
        <OrderForm />
      </Container> */}
    </AuthLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Вход в систему.</title>;
