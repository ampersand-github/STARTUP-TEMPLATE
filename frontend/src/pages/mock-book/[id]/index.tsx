import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useCustomAxios } from 'src/service/axios-config';
import { IBook } from 'src/service/mocks/db/models/book';
import { MOCK_BOOK_URL } from 'src/service/url';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();
  const getOneUrl = `/api/book/${router.query.id}`;
  const [{ data: getData, loading: getLoading, error }, getExecute] =
    useCustomAxios<IBook>({ url: getOneUrl, method: 'get' }, { manual: true });

  useEffect(() => {
    if (router.isReady) getExecute();
  }, [router]);

  if (getLoading || !router.isReady) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <h1>mock</h1>
      {getData && (
        <>
          <h1>本の詳細ページ</h1>
          <p>{getData.id}</p>
          <p>{getData.title}</p>
          <p>{getData.price}</p>
          <Button
            onClick={() => router.push(`${MOCK_BOOK_URL}/${getData.id}/edit`)}
          >
            編集ページへ
          </Button>
          <Button onClick={() => router.push(`${MOCK_BOOK_URL}/`)}>
            一覧ページへ
          </Button>
        </>
      )}
    </>
  );
};
export default Index;
