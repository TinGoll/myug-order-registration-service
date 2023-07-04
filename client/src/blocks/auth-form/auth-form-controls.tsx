import { Box, Typography, alpha, TextField, Button, FormControl, FormHelperText, InputAdornment } from "@mui/material";
import { Link } from "gatsby";
import React, { useState } from "react";
import AuthForm from "./auth-form-layout";

import AccountCircle from "@mui/icons-material/AccountCircle";

import ErrorIcon from "@mui/icons-material/Error";

const AuthFormControls = () => {
  const [mode, setMode] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("SUBMIT", `LOGIN: ${login} PASS: ${password}`);
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
          {mode === 0 ? `Вход в систему` : `Регистрация нового пользователя`}
        </Typography>
        <Typography
          textAlign='center'
          variant='body2'
          sx={(theme) => ({ color: alpha(theme.palette.primary.main, 0.8) })}
        >
          {mode === 0 ? `Используйте свой логин и пароль` : `Пожалуйста, заполните все поля.`}
        </Typography>
      </Box>
      {mode === 1 && (
        <React.Fragment>
          <TextField
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            color='success'
            label='Имя'
            variant='standard'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <ErrorIcon color='error' />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            color='success'
            label='Фамилия'
            variant='standard'
          />

          <TextField
            value={middlename}
            onChange={(event) => setMiddlename(event.target.value)}
            color='success'
            label='Отчество'
            variant='standard'
          />
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            color='success'
            label='Email'
            variant='standard'
          />
          <TextField
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            color='success'
            label='Телефон'
            variant='standard'
          />
        </React.Fragment>
      )}

      <FormControl variant='standard'>
        <TextField
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          required
          color='success'
          label='Логин'
          variant='standard'
        />
        {false && <FormHelperText id='component-error-text'>Error</FormHelperText>}
      </FormControl>
      <TextField
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        color='success'
        label='Пароль'
        type='password'
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
          {mode === 0 ? "Войти" : "Отправить"}
        </Button>
        <Button onClick={() => setMode((prev) => (prev === 0 ? 1 : 0))} type='button' variant='text' color='warning'>
          {mode === 0 ? `Регистрация` : "У меня есть аккаунт"}
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
