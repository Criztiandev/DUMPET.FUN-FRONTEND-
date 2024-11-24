import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:
    process.env.VITE_DEV_ENVIRONMENT === "development"
      ? process.env.VITE_DEV_BASE_URI
      : process.env.VITE_PRODUCTION_BASE_URI,
  withCredentials: true,
});

export const PublicAxios = AxiosInstance;
export const ProtectedAxios = AxiosInstance;
