export const takeOutFromUrlQuery = (
  target: string | string[] | undefined,
): { target?: string; errorMessage?: string } => {
  if (typeof target !== 'string') {
    return { errorMessage: '商品IDが不正です' };
  } else {
    return { target };
  }
};
