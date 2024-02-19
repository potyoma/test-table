const includes = (string1: string, string2: string) =>
  string1.toLocaleLowerCase().includes(string2.toLocaleLowerCase());

const filterByString =
  (queue: string) =>
  (value: object): boolean =>
    Object.values(value).some(val => {
      if (typeof val === "string") return includes(val, queue);

      if (typeof val === "object") return filterByString(queue)(val);

      return false;
    });

export const filterStrings = (values: object[], queue?: string) => {
  if (!queue) return values;

  return values.filter(filterByString(queue));
};
