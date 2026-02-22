import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://adhlal.ammarelgendy.site/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "ar",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("adhlal_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const lang = localStorage.getItem("preferred_language") || "ar";
    config.headers["Accept-Language"] = lang;
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem("adhlal_token");
        localStorage.removeItem("adhlal_user");
        if (window.location.pathname !== "/login") {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }
      if (status === 422 && data?.errors) {
        console.warn("Validation errors:", data.errors);
      }
      if (status >= 500) {
        console.error(`Server error ${status}:`, data?.message || "Unknown server error");
      }
    } else if (error.request) {
      console.error("Network error or timeout:", error.message);
    }
    return Promise.reject(error);
  },
);

export const createFormDataRequest = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });
  return formData;
};

export default apiClient;
