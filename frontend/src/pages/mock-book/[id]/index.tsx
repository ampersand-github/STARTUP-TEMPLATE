import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { axiosConfig } from 'src/service/axios-config';
import { IBook } from 'src/service/mocks/db/models/book';
import { MOCK_BOOK_URL } from 'src/service/url';

const Index: NextPage = () => {
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
  }, [id]);

  return (
    <>
      <h1>mock</h1>
      {book && (
        <>
          <h1>本の詳細ページ</h1>
          <p>{book.id}</p>
          <p>{book.title}</p>
          <p>{book.price}</p>
        </>
      )}
      {book && (
        <Button onClick={() => router.push(`${MOCK_BOOK_URL}/${book.id}/edit`)}>
          編集ページへ
        </Button>
      )}
    </>
  );
};
export default Index;
