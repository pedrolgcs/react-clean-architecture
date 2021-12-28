export const makeApiUrl = (path: string): string =>
  `${import.meta.env.VITE_BASE_URL}${path}`;
