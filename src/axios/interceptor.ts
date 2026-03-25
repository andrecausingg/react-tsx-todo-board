import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    // Handle Content-Type
    if (!(config.data instanceof FormData)) {
      config.headers = config.headers ?? {};
      (config.headers as any)["Content-Type"] = "application/json";
    } else {
      // If FormData, let browser set Content-Type including boundary
      if (config.headers && "Content-Type" in config.headers) {
        delete (config.headers as any)["Content-Type"];
      }
    }

    // PATCH override for
    if (config.method?.toUpperCase() === "PATCH") {
      config.method = "post";
      if (config.data instanceof FormData) {
        config.data.append("_method", "PATCH");
      } else {
        config.data = { ...(config.data || {}), _method: "PATCH" };
      }
    }

    return config;
  },
  (error: any) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        localStorage.setItem("routeLocalStorage", "guest");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }

      if (status === 403) console.warn("Forbidden: insufficient permissions");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
