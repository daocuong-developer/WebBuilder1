import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/", // Use Vite proxy to Django backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default axiosInstance;
