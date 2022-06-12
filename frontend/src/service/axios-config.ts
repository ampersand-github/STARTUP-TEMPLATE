import axios, { AxiosRequestConfig } from 'axios';
import { makeUseAxios } from 'axios-hooks';
export const axiosConfig = async (): Promise<AxiosRequestConfig> => {
  return {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const axiosConfigWithAuth = async (): Promise<AxiosRequestConfig> => {
  return {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer await getToken()`, // todo AUTH
    },
  };
};

export const useCustomAxios = makeUseAxios({
  axios: axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
});
