import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';
import React, { useEffect, useState } from 'react';
import {
  getClientSecretWithProduct,
  IClientSecret,
  IProduct,
} from 'src/service/stripe/get-payment-product';
import * as stripeJs from '@stripe/stripe-js';
import { Box } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from 'src/pages/_app';
import { PurchaseBody } from 'src/component/organism/stripe/purchase-body';
import { PurchaseInfo } from 'src/component/organism/stripe/purchase-info';

/*
stripeのクレジットカード入力や実行ボタンは<Element>の中でないと入力、実行ができない。
正確にいうと<Element>の中でないとuseElements()が使用できない。
よって、<Element>の外側でclient_secretを生成し、
<Element>の内側でカードの入力、購入ボタンをつくる
/*

stripeで購入するまでの手順
    useEffect
        urlのqueryから商品のIDを取得する
        その商品のIDを使ってbackendでclient_secretを作成する(※1)
    ユーザー
        クレジットカードを入力する
        (必要があればその他の情報を取得する)
        ユーザーが購入ボタンを押す
        成功なら成功URLに遷移する
    ※1
        client_secretは1回の決済に関わる情報が暗号化されている
        client_secretにはstripeのcustomerIdが含まれている。
        このタイミングでcustomerIdをあれば取得、なければ生成している
 */

const Purchase: NextPage = () => {
  const { back, query } = useRouter();
  const customSnackbar = useCustomSnackbar();
  const [clientSecret, setClientSecret] = useState<IClientSecret>();
  // todo 考える IPaymentProductからclientSecretを毛づる
  const [product, setProduct] = useState<IProduct>();

  const error = (message: string) => {
    customSnackbar({ message, variant: 'error' });
    back();
  };

  useEffect(() => {
    const cleanUp = async () => {
      //
      // urlからidを抽出
      //
      const { productId } = query;
      if (typeof productId !== 'string') {
        error('商品IDが不正です');
        return; // ここで処理を終わらせる
      }
      //
      // バックエンドからproductを取得
      //
      try {
        // todo もっといいやり方ない？ 命名
        // getClientSecretWithProduct
        const result = await getClientSecretWithProduct(productId);
        setClientSecret(result.clientSecret);
        setProduct({
          image: result.image,
          name: result.name,
          price: result.price,
        });
      } catch (err: unknown) {
        if (err instanceof Error) error(err.toString());
        throw err;
      }
    };
    cleanUp();
  }, []);

  const options: stripeJs.StripeElementsOptions = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    <Box>
      {/* 購入する商品の情報を表示する場所 */}
      {product && (
        <PurchaseInfo
          image={product.image}
          name={product.name}
          price={product.price}
        />
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {/* 購入フォームと購入ボタン */}
          <PurchaseBody />
        </Elements>
      )}
    </Box>
  );
};
export default Purchase;
