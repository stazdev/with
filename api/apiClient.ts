import useAuthStore from "@/store/authStore";
import axios, { AxiosError } from "axios";

const BASE_URL =
  "https://withjaraapp-h5avgudddxeneuam.eastus-01.azurewebsites.net/app/v1/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const authToken = useAuthStore.getState().authToken;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuthStore();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
