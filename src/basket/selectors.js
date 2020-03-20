const getState = (s) => s.basket;

export const getBasketLines = (s) => {
  const ls = getState(s);

  if (ls) {
    return ls.lines || [];
  }

  return [];
}
