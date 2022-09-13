export const fetchRandomOne = <T>(values: T[]): T => {
  const number = Math.floor(Math.random() * values.length)
  return values[number];
};
