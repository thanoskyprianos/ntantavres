import { Base64String } from '../types/Avatar.ts';

export const ONE_MB = 1024 * 1024;

export const toBase64 = (file: File): Promise<Base64String> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const base64Size = (b64: Base64String) => {
  return Math.ceil((b64.length * 3) / 4);
};
