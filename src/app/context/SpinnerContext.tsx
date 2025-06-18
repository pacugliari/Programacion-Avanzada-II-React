import React, { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

type SpinnerContextType = {
  show: (title?: string) => void;
  hide: () => void;
  isLoading: boolean;
};

let hideSpinner: (() => void) | null = null;

export function registerHideSpinner(fn: () => void) {
  hideSpinner = fn;
}
export function callHideSpinner() {
  hideSpinner && hideSpinner();
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export function SpinnerProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const show = (title = "Cargando...") => {
    if (isLoading) return;
    setIsLoading(true);
    Swal.fire({
      title,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        setIsLoading(false);
      },
    });
  };

  const hide = () => {
    Swal.close();
    setIsLoading(false);
  };

  useEffect(() => {
    registerHideSpinner(hide);
  }, [hide]);

  return (
    <SpinnerContext.Provider value={{ show, hide, isLoading }}>
      {children}
    </SpinnerContext.Provider>
  );
}

export function useSpinner() {
  const ctx = useContext(SpinnerContext);
  if (!ctx)
    throw new Error("useSpinner debe usarse dentro de <SpinnerProvider>");
  return ctx;
}
