import {
  Box,
  Typography,
  alpha,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Link } from "gatsby";
import React, { useCallback, useEffect, useState } from "react";
import AuthForm from "./auth-form-layout";

import ErrorIcon from "@mui/icons-material/Error";
import useDebounce from "../../hooks/use-debounce";
import $axios from "../../axios";

import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginThunk } from "../../store/thunks/auth/login.thunk";
import { registrationThunk } from "../../store/thunks/auth/registration.thunk";

interface ErrorObject {
  login: null | string;
}

interface LoadingsObject {
  login?: boolean;
}

const errorDefine = (data: Partial<ErrorObject> = {}): ErrorObject => ({
  login: null,
  ...data,
});

const loadingsDefine = (data: Partial<LoadingsObject> = {}): LoadingsObject => ({
  login: false,
  ...data,
});

const AuthFormControls = () => {
  const dispatch = useAppDispatch();
  const aurhState = useAppSelector((state) => state.authorization);

  const [errors, setErrors] = useState<ErrorObject>(errorDefine);
  const [loadings, setLoadings] = useState<LoadingsObject>(loadingsDefine);

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

    if (mode === 0) {
      loginHandler();
    }

    if (mode === 1) {
      registrationHandler();
    }
  };

  const clearRegistrationData = () => {
    setName("");
    setLastname("");
    setMiddlename("");
    setEmail("");
    setPhone("");
  };

  const clearAuthData = () => {
    setLogin("");
    setPassword("");
  };

  const registrationHandler = () => {
    dispatch(
      registrationThunk({
        firstName: name,
        lastName: lastname,
        middleName: middlename,
        email,
        phone,
        login,
        password,
      })
    )
      .then(({ payload }) => {
        if ((payload as any)?.response?.status === 401 || (payload as any)?.response?.status === 404) {
        } else {
          clearRegistrationData();
          clearAuthData();
        }
      })
      .catch((err) => console.log("err >>>", err));
  };

  const loginHandler = () => {
    if (!login || !password) {
      return;
    }
    dispatch(
      loginThunk({
        login,
        password,
      })
    )
      .then(({ payload }) => {
        if ((payload as any)?.response?.status === 401 || (payload as any)?.response?.status === 404) {
        }
      })
      .catch((err) => console.log("err >>>", err));
  };

  const loginExists = useCallback((searchedLogin: string) => {
    setLoadings((prev) => ({ ...prev, login: true }));
    $axios
      .get<boolean>("/persons/exists", {
        params: {
          login: searchedLogin,
        },
      })
      .then((responce) => {
        if (responce.data) {
          setErrors((prev) => ({ ...prev, login: `Это имя пользователя уже занято.` }));
        } else {
          setErrors((prev) => ({ ...prev, login: null }));
        }
      })
      .catch((err) => console.log("ERROR >>>", err))
      .finally(() => setLoadings((prev) => ({ ...prev, login: false })));
  }, []);

  // Проверка, не занят ли логин.
  useDebounce(
    () => {
      if (mode === 1 && login) {
        loginExists(login);
      }
    },
    1000,
    [login, mode, loginExists]
  );

  useEffect(() => {
    if (mode === 0) {
      setErrors((prev) => ({ ...prev, login: null }));
    }
    if (mode === 1) {
    }
  }, [mode]);

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

      <FormControl variant='standard' error={Boolean(errors.login)}>
        <TextField
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          required
          color='success'
          label='Логин'
          variant='standard'
          error={Boolean(errors.login)}
          InputProps={{
            endAdornment:
              Boolean(errors.login) || Boolean(loadings.login) ? (
                <InputAdornment position='end'>
                  {loadings.login ? <CircularProgress size={22} color='success' /> : <ErrorIcon color='error' />}
                </InputAdornment>
              ) : null,
          }}
        />
        {Boolean(errors.login) && <FormHelperText>{errors.login}</FormHelperText>}
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
        <LoadingButton
          loadingIndicator='Загрузка...'
          loading={aurhState.loadind}
          type='submit'
          sx={{ borderRadius: "1000px" }}
          variant='contained'
          color='secondary'
        >
          {mode === 0 ? "Войти" : "Отправить"}
        </LoadingButton>
        <Button onClick={() => setMode((prev) => (prev === 0 ? 1 : 0))} type='button' variant='text' color='warning'>
          {mode === 0 ? `Регистрация` : "У меня есть аккаунт"}
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "flex-end" }}>
        <Typography sx={{ fontSize: "0.8em", color: "red" }}>{aurhState.error}</Typography>
        <Typography
          textAlign='right'
          variant='body2'
          sx={(theme) => ({ flex: 1, color: alpha(theme.palette.info.main, 0.8), textDecoration: "underline" })}
        >
          <Link to='/auth'>Забыли пароль?</Link>
        </Typography>
      </Box>
    </AuthForm.Form>
  );
};

export default AuthFormControls;
