const getState = (s) => s.product;

export function getProductForCustomize(s) {
  const ls = getState(s);

  if (ls) {
    return ls.product;
  }

  return null;
}

export function getProductConfig(s) {
  const ls = getState(s);

  if (ls) {
    return ls.config || [];
  }

  return [];
}
