import { getToken } from '@/utils/token';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://game.sanboxs.site/server/',
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

