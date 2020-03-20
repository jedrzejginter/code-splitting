export const isServer = typeof window === 'undefined';
export const isBrowser = !isServer;

export function mapObject(o, fn) {
  const mappedObject = {};

  for (const k in o) {
    mappedObject[k] = fn(o[k], k);
  }

  return mappedObject;
}
