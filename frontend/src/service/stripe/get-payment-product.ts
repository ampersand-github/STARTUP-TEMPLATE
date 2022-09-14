/*
    backendから値を習得する
  */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { axiosConfig } from 'src/service/axios-config';
import { STRIPE_PAYMENT_URL } from 'src/service/url';

export type IClientSecret = string;

export interface IProduct {
  image: string;
  name: string;
  price: number;
}

export type IClientSecretWithProduct = IClientSecret & IProduct;

export const getClientSecretWithProduct = async (id: string): Promise<any> => {
  return await axios
    .post(STRIPE_PAYMENT_URL, { productId: id }, await axiosConfig())
    .then((res: AxiosResponse<IClientSecretWithProduct>) => res.data)
    .catch((err) => {
      console.log(err);
      if (err instanceof AxiosError && err.response)
        throw new Error(`${err.response.status}:${err.response.data.message}`);
      throw new Error('値を取得することができません');
    });
};
