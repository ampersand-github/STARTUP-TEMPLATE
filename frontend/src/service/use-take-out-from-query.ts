import React, { useEffect, useState } from 'react';
import { NextRouter } from 'next/dist/shared/lib/router/router';

export interface IUseTakeOutFromQuery {
  key: string;
  router: NextRouter;
}

export const useTakeOutFromQuery = () => {
  const [data, setData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const takeout = (props: IUseTakeOutFromQuery) => {
    const target = props.router.query[props.key];
    if (!props.router.isReady) setIsLoading(true);
    // string以外はエラーとする
    if (typeof target === 'string') {
      setData(target);
      console.log(`target:${target}`);
    } else if (!target) {
      setError('値が設定されていません');
    } else if (typeof target === 'object') {
      setError('値が配列で設定されています');
    } else {
      setError('値が不正です');
    }
  };

  return [data, isLoading, error, takeout] as const;
};
