import { Box, CircularProgress, Container } from "@mui/material";
import React from "react";
import AuthLayout from "../../layouts/auth-layout";
import AuthFormControls from "./auth-form-controls";
import AuthForm from "./auth-form-layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BEARER_TOKEN_KEY } from "../../axios";
import { tokenVerificationThunk } from "../../store/thunks/auth/token-verification.thunk";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const authorized = useAppSelector((state) => state.authorization.authorized);
  const [tokenVerification, setTokenVerification] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!authorized) {
      const token = localStorage.getItem(BEARER_TOKEN_KEY);
      if (token) {
        dispatch(
          tokenVerificationThunk({
            token,
          })
        ).finally(() => setTokenVerification(true));
      } else {
        setTokenVerification(true);
      }
    }
    return () => {};
  }, []);

  if (!tokenVerification) {
    return (
      <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress color='secondary' />
      </Box>
    );
  }

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

export default AuthPage;
