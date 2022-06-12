import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { IBook } from 'src/service/mocks/db/models/book';
import { axiosConfig } from 'src/service/axios-config';

const Edit: NextPage = () => {
  const [book, setBook] = useState<IBook>();
  const [id, setId] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const cleanUp = async () => {
      if (!router.isReady) return <>...loading</>;
      const id = router.query.id;
      if (typeof id !== 'string') return <>error!</>;
      setId(id);
    };
    cleanUp();
  }, [router]);

  useEffect(() => {
    const cleanUp = async () => {
      const { data }: AxiosResponse<IBook> = await axios.get(
        `/api/book/${id}`,
        await axiosConfig(),
      );
      setBook(data);
    };
    cleanUp();
  }, []);

  const updateBook = async () => {
    const book: IBook = { id: 'id3', title: 'title10', price: 10000 };
    const { data }: AxiosResponse = await axios.put(
      `/api/book/${book.id}`,
      book,
      await axiosConfig(),
    );
    await router.back();
  };
  return (
    <>
      <p>ここにform</p>
      {book && (
        <>
          <p>{book.id}</p>
          <p>{book.title}</p>
          <p>{book.price}</p>
        </>
      )}

      <Button onClick={() => updateBook()}>本の編集</Button>
    </>
  );
};
export default Edit;
