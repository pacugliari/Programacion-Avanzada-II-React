import axios, { AxiosError } from "axios";
import { clearAuth, getToken } from "./auth-storage";
import { callHideSpinner } from "../context/SpinnerContext";
import {
  HttpStatus,
  type ApiErrorResponse,
  type HttpStatusCode,
} from "./types";
import { AlertService } from "./alert";

export const ContentTypes = {
  json: { "Content-Type": "application/json" },
  formData: { "Content-Type": "multipart/form-data" },
};

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: ContentTypes.json,
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (axiosError: AxiosError<ApiErrorResponse>) => {
    callHideSpinner();

    if (axiosError.response) {
      await handleApiError(
        axiosError.response.status as HttpStatusCode,
        axiosError.response.data
      );
    } else {
      await AlertService.showError([
        { error: "No se pudo conectar al servidor." },
      ]);
    }

    return Promise.reject(axiosError.response?.data?.errors || []);
  }
);

async function handleApiError(status: HttpStatusCode, data: ApiErrorResponse) {
  if (status === HttpStatus.UNAUTHORIZED) {
    const response = await AlertService.showError(data.errors || []);
    if (response.value) {
      logoutAndRedirect();
    }
  }
}

function logoutAndRedirect() {
  clearAuth();
  window.location.href = "/login";
}

export default http;
