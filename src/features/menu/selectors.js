const getState = (s) => s.menu;

export function getProducts(s) {
  const ls = getState(s);

  if (ls) {
    return Object.values(ls.products);
  }

  return [];
}

function rightJoin(l, r, lp, rp) {
  const joined = { ...l };

  for (const k in joined) {
    joined[k][lp] = [];
  }

  for (const id in r) {
    const p = r[id];
    const fk = p[rp];

    const le = joined[fk];
    const coll = lp in le ? le[lp] : [];

    joined[fk][lp] = le[lp].concat(p);
  }

  return joined;
}

export function getCategoriesWithProducts(s) {
  const ls = getState(s);

  if (ls) {
    const { categories, products } = ls;

    return Object.values(rightJoin(categories, products, 'products', '_categoryId'));
  }

  return [];
}
