import { Base64String } from '@/types/Avatar.ts';

// little lower than firestore document limit
const DOC_LIMIT = 1048000;
export const ONE_MB = 1024 * 1024;
export const CHUNK_LIMIT = 7;

export const toBase64 = (file: File): Promise<Base64String> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const chunk = (file: Base64String) => {
  return file.match(new RegExp(`.{1,${DOC_LIMIT}}`, 'g'));
};
