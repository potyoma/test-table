export const replaceWith = <T>(
  arr: T[],
  replacement: T,
  comparer: (val: T) => boolean
) =>
  arr.forEach((val, i) => {
    if (comparer(val)) arr[i] = replacement;
  });
