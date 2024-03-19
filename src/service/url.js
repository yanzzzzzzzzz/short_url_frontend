import axios from 'axios';
import { useUserStore } from '../stores/UserStore';

const API_BASE_URL = '/api/url';

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.user.token) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const createShortUrl = async (url) => {
  const response = await apiClient.post('/', { url });
  return response.data;
};

const getAllUrl = async () => {
  const response = await apiClient.get('/');
  return response;
};

const deleteUrl = async (url) => {
  const response = await apiClient.delete(`/${url}`);
  return response;
};

export default {
  createShortUrl,
  getAllUrl,
  deleteUrl
};
