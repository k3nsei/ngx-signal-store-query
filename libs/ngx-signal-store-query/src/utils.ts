export const lowerFirst = <T extends string>(value: T): Uncapitalize<T> => {
  const first: string = value.charAt(0).toLowerCase();
  const rest: string = value.slice(1);

  return `${first}${rest}` as Uncapitalize<T>;
};
