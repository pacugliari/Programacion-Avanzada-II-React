import axios from "axios";
import Swal from "sweetalert2";
import { clearAuth, getToken } from "./auth-storage";
import { callHideSpinner } from "./SpinnerContext";

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL });

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
  (error) => {
    if (error.response) {
      callHideSpinner();
      const status = error.response.status;
      if (status === 400 || status === 401) {
        Swal.fire({
          icon: "error",
          title: `Error: ${status}`,
          text: error.response.data?.message,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed && status === 401) {
            logoutAndRedirect();
          }
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar al servidor.",
      });
    }
    return Promise.reject(error);
  }
);

function logoutAndRedirect() {
  clearAuth();
  window.location.href = "/login";
}

export default http;
