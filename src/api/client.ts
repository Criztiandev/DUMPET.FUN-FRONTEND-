import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.VITE_DEV_ENVIRONMENT === "test"
      ? process.env.VITE_DEV_TEST_URI
      : process.env.VITE_DEV_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
