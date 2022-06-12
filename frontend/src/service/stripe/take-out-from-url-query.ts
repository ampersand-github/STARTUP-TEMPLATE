export const takeOutFromUrlQuery = (
  target: string | string[] | undefined,
): { target?: string; errorMessage?: string } => {
  if (typeof target !== 'string') {
    return { errorMessage: 'urlQueryが文字列ではありません' };
  } else {
    return { target };
  }
};
