import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button, Card, CardActions, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { IBook } from 'src/service/mocks/db/models/book';
import { axiosConfig } from 'src/service/axios-config';
import { MOCK_BOOK_URL } from 'src/service/url';

const Index: NextPage = () => {
  const [books, setBooks] = useState<IBook[]>();
  const router = useRouter();

  useEffect(() => {
    const cleanUp = async () => {
      console.log('cleanUp');
      const res: AxiosResponse<IBook[]> = await axios.get(
        '/api/book',
        await axiosConfig(),
      );
      setBooks(res.data);
    };
    cleanUp();
  }, []);

  const deleteId = async (book: IBook) => {
    await axios.delete(`/api/book/${book.id}`, await axiosConfig());
    const { data }: AxiosResponse<IBook[]> = await axios.get(
      '/api/book',
      await axiosConfig(),
    );
    setBooks(data);
  };

  return (
    <>
      <h1>書籍一覧</h1>
      {books &&
        books.map((one: IBook) => (
          <Card key={one.id} sx={{ padding: 1, margin: 2 }}>
            <Typography variant={'caption'}>{one.id}</Typography>
            <Typography variant="h5" component="div">
              {one.title}
            </Typography>
            <p>{one.price}円</p>
            <CardActions>
              <Button
                onClick={() => router.push(`${MOCK_BOOK_URL}/${one.id}/edit`)}
              >
                編集ページへ
              </Button>
              <Button
                onClick={() => router.push(`${MOCK_BOOK_URL}/${one.id}/`)}
              >
                詳細ページへ
              </Button>
              <Button onClick={() => deleteId(one)}>削除</Button>
            </CardActions>
          </Card>
        ))}
      <Button onClick={() => router.push(`${MOCK_BOOK_URL}/resister`)}>
        本の追加
      </Button>
    </>
  );
};
export default Index;
