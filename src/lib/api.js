import axios from "axios";

const API_ROOT = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
const API_URL = `${API_ROOT}/api`;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("steelconUser");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export const getApiError = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message || error?.response?.data?.err || error?.message || fallback;

export default api;
