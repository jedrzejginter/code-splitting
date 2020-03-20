const getState = (s) => s.address;

export const getSingleStringTopResults = (s) => {
  const ls = getState(s);

  if (ls) {
    return (ls.results || []).slice(0, 5);
  }

  return [];
}
