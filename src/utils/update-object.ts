import { EditForm } from "../components/organisms/edit-modal";

export const updateObject = <T>(model: T, values: EditForm) =>
  Object.entries(values).reduce(
    (acc, [key, value]) => {
      if (typeof value === "object") acc[key] = updateObject(acc[key], value);

      acc[key] = value;

      return acc;
    },
    { ...model } as Record<string, unknown>
  ) as T;
