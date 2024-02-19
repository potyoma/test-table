export const addParentToKey = (name: string, parent?: string) =>
  parent ? `${parent}.${name}` : name;
