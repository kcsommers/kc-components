export const isPromise = <T = any>(p: any): p is Promise<T> => {
  return typeof p === 'object' && typeof p.then === 'function';
};
