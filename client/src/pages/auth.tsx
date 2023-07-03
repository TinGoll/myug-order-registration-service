import * as React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import AuthLayout from "../layouts/auth-layout";
import AuthForm from "../blocks/auth-form/auth-form-layout";
import AuthFormControls from "../blocks/auth-form/auth-form-controls";

const IndexPage: React.FC<PageProps> = ({ uri }) => {
  return (
    <AuthLayout
      component='main'
      sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container sx={{ flex: 1 }}>
        <AuthForm.Root>
          <AuthForm.Logo />
          <AuthFormControls />
        </AuthForm.Root>
      </Container>
    </AuthLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Вход в систему.</title>;
