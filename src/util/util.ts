export const removeEmptyFields = (obj: any) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));

export const isEmpty = (obj: any) => Object.entries(obj).length === 0;
