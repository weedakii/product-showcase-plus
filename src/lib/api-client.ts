// api-client.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://adhlal.ammarelgendy.site/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "ar", // Default to Arabic — can be overridden
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor - add auth token & handle language
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("adhlal_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: allow overriding Accept-Language per request
    const lang = localStorage.getItem("preferred_language") || "ar";
    config.headers["Accept-Language"] = lang;

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - better error handling & 401 redirect
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle unauthorized (token expired/invalid)
      if (status === 401) {
        localStorage.removeItem("adhlal_token");
        localStorage.removeItem("adhlal_user");

        // Prevent redirect loop
        if (window.location.pathname !== "/login") {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }

      // Common validation error format (Laravel style)
      if (status === 422 && data?.errors) {
        // You could also show toast here, but better to let the component handle it
        console.warn("Validation errors:", data.errors);
      }

      // Log other server errors
      if (status >= 500) {
        console.error(
          `Server error ${status}:`,
          data?.message || "Unknown server error",
        );
      }
    } else if (error.request) {
      // No response received (network error, timeout, etc.)
      console.error("Network error or timeout:", error.message);
    }

    return Promise.reject(error);
  },
);

// Optional: helper for form-data requests (image uploads, etc.)
export const createFormDataRequest = <T>(
  data: Record<string, any>,
): FormData => {
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
