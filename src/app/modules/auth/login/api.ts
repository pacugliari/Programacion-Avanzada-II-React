import http from "../../../shared/http";
import type { LoginRequest, LoginResponse } from "./types";

const API_ROUTE = import.meta.env.VITE_API_URL;

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await http.post(`${API_ROUTE}/auth/login`, data);
  return response.data;
};

export const ApiService = {
  login,
};
