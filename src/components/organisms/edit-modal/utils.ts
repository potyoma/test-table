export const keepStringOnly = <T>(model: T) =>
  Object.entries(model as object).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      acc[key] = value;
    }

    if (typeof value === "object") {
      acc[key] = keepStringOnly(value);
    }

    return acc;
  }, {} as Record<string, string | object>);
