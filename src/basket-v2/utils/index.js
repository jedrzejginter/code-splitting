
export function wrapProduct(p) {
  return { ...p, $wrapped: true };
}
