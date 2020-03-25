const getState = (s) => s.order;

export const getIsOrderStarted = (s) => {
  const ls = getState(s);

  if (ls) {
    return ls.started;
  }

  return false;
}

export const getAddressForOrder = (s) => {
  const ls = getState(s);

  if (ls) {
    return ls.address;
  }

  return null;
}
