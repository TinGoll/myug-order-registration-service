import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import $axios from '.'


export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<
  {
    url: string
    method?: AxiosRequestConfig['method']
    body?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
  }, unknown, unknown> =>

  async ({ url, method, body, params, headers }, { signal, dispatch, getState }, extraOptions): Promise<{
    data: any;
    error?: undefined;
    meta?: { request: Request; response: Response };
  } | {
    error: {
      status: number;
      data: any;
    };
    data?: undefined;
    meta?: { request: Request; response: Response };
  }> => {
    try {
      const config: AxiosRequestConfig = {
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers
      }
      const result: AxiosResponse = await $axios(config);

      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: { status: err.response?.status || 500, data: err.response?.data },
      }
    }
  }
