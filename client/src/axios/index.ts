import axios, { AxiosRequestHeaders } from "axios";

export const API_URL = `${process.env.GATSBY_API_HOST}:${process.env.GATSBY_API_PORT}/api`;
export const BEARER_TOKEN_KEY = "bearer_token";

const $axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": `${process.env.GATSBY_API_HOST}:${process.env.GATSBY_API_PORT}`,
    "Content-Type": "application/json",
  },
});

$axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  const token = localStorage.getItem(BEARER_TOKEN_KEY);
  
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default $axios;
