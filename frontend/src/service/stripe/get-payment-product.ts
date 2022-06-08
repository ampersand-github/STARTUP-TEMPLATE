/*
    backendから値を習得する
  */
import axios, { AxiosError } from 'axios';
import { axiosConfig } from 'src/service/axios-config';
import { STRIPE_PAYMENT_URL } from 'src/service/url';

export interface IPaymentProduct {
  clientSecret: string;
  image: string;
  name: string;
  price: number;
}

export const getPaymentProduct = async (
  id: string,
): Promise<IPaymentProduct> => {
  try {
    const { data } = await axios.post(
      STRIPE_PAYMENT_URL,
      { productId: id },
      await axiosConfig(),
    );
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response)
      throw new Error(`${err.response.status}:${err.response.data.message}`);
    throw new Error('値を取得することができません');
  }
};
