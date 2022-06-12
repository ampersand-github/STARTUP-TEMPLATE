import type { NextPage } from 'next';
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { IBook, IBookWithoutId } from 'src/service/mocks/db/models/book';
import { TextForm } from 'src/component/atom/form/text-form';
import { useForm } from 'react-hook-form';
import { axiosConfig } from 'src/service/axios-config';

const Resister: NextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  const router = useRouter();

  const onSubmit = async (props: IBookWithoutId) => {
    await axios
      .post(`/api/book`, props, await axiosConfig())
      .then((one: AxiosResponse) => router.back())
      .catch((one) => console.log('エラーが発生しました'));
  };
  return (
    <>
      <h1>新規の書籍を登録する</h1>
      <p>ここにform</p>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        spacing={3}
      >
        <TextForm
          control={control}
          rules={{ required: 'タイトルを入力してください' }}
          name={'title'}
          inputType="text"
          label={'タイトル'}
          isError={errors.title !== undefined}
          errorText={errors.title?.message}
        />
        <TextForm
          control={control}
          rules={{ required: '値段を入力してください' }}
          name={'price'}
          inputType="number"
          label={'価格'}
          isError={errors.price !== undefined}
          errorText={errors.price?.message}
        />
        <Button type={'submit'}>書籍を追加する</Button>
      </Stack>
    </>
  );
};
export default Resister;
