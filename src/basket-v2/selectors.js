const getState = (s) => s.basket;

export const getProducts = (s) => {
  const ls = getState(s);

  if (ls) {
    return ls.products;
  }

  return [];
}
