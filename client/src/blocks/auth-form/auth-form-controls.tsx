import { Box, Typography, alpha, TextField, Button } from "@mui/material";
import { Link } from "gatsby";
import React from "react";
import AuthForm from "./auth-form-layout";

const AuthFormControls = () => {
  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    

  };

  return (
    <AuthForm.Form component='form' onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          textAlign='center'
          variant='h3'
          fontWeight={500}
          fontFamily='Orchidea Pro'
          sx={(theme) => ({ color: alpha(theme.palette.primary.main, 0.8) })}
        >
          Вход в систему
        </Typography>
        <Typography
          textAlign='center'
          variant='body2'
          sx={(theme) => ({ color: alpha(theme.palette.primary.main, 0.8) })}
        >
          Используйте свой логин и пароль
        </Typography>
      </Box>

      <TextField color='secondary' id='standard-required' label='Логин' variant='standard' />
      <TextField
        color='secondary'
        id='standard-password-input'
        label='Пароль'
        type='password'
        autoComplete='current-password'
        variant='standard'
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          ">*": {
            flex: 1,
          },
        }}
      >
        <Button type='submit' sx={{ borderRadius: "1000px" }} variant='contained' color='secondary'>
          Войти
        </Button>
        <Button type='button' variant='text' color='warning'>
          Регистрация
        </Button>
      </Box>
      <Box>
        <Typography
          textAlign='right'
          variant='body2'
          sx={(theme) => ({ color: alpha(theme.palette.info.main, 0.8), textDecoration: "underline" })}
        >
          <Link to='/auth'>Забыли пароль?</Link>
        </Typography>
      </Box>
    </AuthForm.Form>
  );
};

export default AuthFormControls;
