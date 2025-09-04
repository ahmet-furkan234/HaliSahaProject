export function buildUpdateQuery(obj: any, prefix = ""): Record<string, any> {
  const update: Record<string, any> = {};

  for (const key in obj) {
    if (obj[key] === undefined) continue;

    const value = obj[key];

    if (typeof value === "object" && !Array.isArray(value)) {
      Object.assign(update, buildUpdateQuery(value, `${prefix}${key}.`));
    } else {
      update[`${prefix}${key}`] = value;
    }
  }

  return update;
}
