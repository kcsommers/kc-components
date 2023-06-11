export const getRandomDate = (): number => {
  return new Date(Math.random() * new Date().getTime()).getTime();
};
