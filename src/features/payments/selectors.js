const getState = (s) => s.payments;

export const getPaymentMethod = (s) => {
  const ls = getState(s);

  if (ls) {
    return ls.method;
  }

  return 'blik';
}
