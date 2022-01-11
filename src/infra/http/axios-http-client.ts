import axios, { AxiosError } from 'axios';
import { destroyCookie } from 'nookies';

function signOut() {
  destroyCookie(undefined, 'access_token');
  window.location.reload();
}

function setupAPIClient() {
  const api = axios.create({
    baseURL: 'http://localhost:3333/api',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        signOut();
      }

      return Promise.reject(error.response);
    },
  );

  return api;
}

const apiClient = setupAPIClient();

export { apiClient };
