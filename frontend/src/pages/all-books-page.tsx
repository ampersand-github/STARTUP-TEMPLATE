import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

const AllBooksPage: NextPage = (props: any) => {
  const data = props.data;
  console.log(data[0].name);
  return (
    <div>
      <div>AllBooks</div>
      {data.map((one: { name: string; author: string }) => {
        return (
          <div key={one.name}>
            <div key={one.name}>
              {one.name}/{one.author}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllBooksPage;

// サーバサイドで実行する処理(getServerSideProps)を定義する
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res: Response = await fetch('http://localhost:3001/book');
  const data = await res.json();
  return { props: { data } };
};
