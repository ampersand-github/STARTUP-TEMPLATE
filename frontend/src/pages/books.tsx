import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import axios from 'axios';
import { axiosConfig } from 'src/service/axios-config';

// サーバサイドで実行する処理(getServerSideProps)を定義する
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get(`book`, await axiosConfig());
  return { props: { data } };
};

const Books: NextPage = (props: any) => {
  // useSWR使ってみたい
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

export default Books;
