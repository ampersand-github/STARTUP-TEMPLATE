import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { IBook, IBookWithoutId } from 'src/service/mocks/db/models/book';
import { useCustomAxios } from 'src/service/axios-config';
import { TextForm } from 'src/component/atom/form/text-form';
import { useForm } from 'react-hook-form';

const Edit: NextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();
  const router = useRouter();
  const getOneUrl = `/api/book/${router.query.id}`;
  const [{ data: getBook, loading: getLoading, error: getError }, getExecute] =
    useCustomAxios<IBook>({ url: getOneUrl, method: 'get' }, { manual: true });
  const [{ data: putBook, loading: putLoading, error: putError }, putExecute] =
    useCustomAxios<IBook>({ url: getOneUrl, method: 'put' }, { manual: true });

  useEffect(() => {
    if (router.isReady) getExecute();
  }, [router]);

  const onSubmit = async (props: IBookWithoutId) => {
    putExecute({ data: props });
    await router.back();
  };

  if (getLoading || putLoading || !router.isReady) return <p>Loading...</p>;
  if (getError || putError) return <p>Error!</p>;
  return (
    <>
      <p>ここにform</p>
      {getBook && (
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
          <p>{getBook.id}</p>
          <TextForm
            control={control}
            rules={{ required: 'タイトルを入力してください' }}
            name={'title'}
            inputType="text"
            label={'タイトル'}
            isError={errors.title !== undefined}
            errorText={errors.title?.message}
            value={getBook.title}
          />
          <TextForm
            control={control}
            rules={{ required: '値段を入力してください' }}
            name={'price'}
            inputType="number"
            label={'価格'}
            isError={errors.price !== undefined}
            errorText={errors.price?.message}
            value={getBook.price}
          />
          <Button type={'submit'}>書籍を更新する</Button>
        </Stack>
      )}
    </>
  );
};
export default Edit;
