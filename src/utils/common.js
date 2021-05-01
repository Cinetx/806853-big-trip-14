export const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayItem = (ar) => {
  const randomItem = getRandomInt(0, ar.length - 1);
  return ar[randomItem];
};
