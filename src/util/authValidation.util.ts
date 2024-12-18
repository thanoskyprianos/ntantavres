const checks = new Map<string, (password: string) => boolean>([
  [
    'length',
    (password: string) => password.length >= 8 && password.length <= 24,
  ],
  ['uppercase', (password: string) => /[A-Z]+/.test(password)],
  ['lowercase', (password: string) => /[a-z]+/.test(password)],
  ['number', (password: string) => /[0-9]+/.test(password)],
  [
    'symbol',
    (password: string) =>
      /[\^$*.\[\]{}()?"!@#%&\/\\,><':;|_~`]+/.test(password),
  ],
]);

export const passwordValidation = (password: string): Map<string, boolean> => {
  return new Map<string, boolean>(
    Array.from(checks.entries()).map(([n, v]) => [n, v(password)])
  );
};

export const emailValidation = (email: string): boolean => {
  return /^\S+@\S+\.\S+$/.test(email);
};
