import Swal, { type SweetAlertIcon } from "sweetalert2";
import type { ApiError } from "./types";

export interface AlertResult {
  value?: any;
  dismiss?: Swal.DismissReason;
}

const showAlert = async (
  title: string,
  message: string,
  icon: SweetAlertIcon
): Promise<AlertResult> => {
  const result = await Swal.fire({
    title,
    html: message,
    icon,
    confirmButtonText: "Aceptar",
    allowOutsideClick: false,
  });

  return {
    value: result.value,
    dismiss: result.dismiss ? result.dismiss : undefined,
  };
};

export const AlertService = {
  showSuccess: (message: string): Promise<AlertResult> =>
    showAlert("Éxito", message, "success"),

  showError: (
    apiErrorResponse: ApiError[],
    title = "Error"
  ): Promise<AlertResult> => {
    const errorMessages = (apiErrorResponse ?? []).map(
      (err: string | { [key: string]: string }) =>
        typeof err === "string" ? err : Object.values(err).join(", ")
    );
    return showAlert(
      title,
      errorMessages.map((msg) => `<p>${msg}</p>`).join(""),
      "error"
    );
  },
};
