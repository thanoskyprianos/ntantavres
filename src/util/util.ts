export const removeEmptyFields = (obj: any) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));

export const isEmpty = (obj: any) => Object.entries(obj).length === 0;

// for some reason timestamps are different in firestore
export const firestoreTimestampToDate = (obj?: Date | null) => {
  return new Date((obj as unknown as { seconds: number }).seconds * 1000);
};
