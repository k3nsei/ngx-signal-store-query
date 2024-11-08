export const lowerFirst = <T extends string>(value: T): Uncapitalize<T> => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();

  const first: string = trimmed.charAt(0).toLowerCase();
  const rest: string = trimmed.slice(1);

  return `${first}${rest}` as Uncapitalize<T>;
};
