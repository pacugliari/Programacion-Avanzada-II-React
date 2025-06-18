import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "./auth-storage";

export function TokenGuard() {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }
  return React.createElement(Outlet);
}
