import http from "../../../shared/http";
import type { RegisterRequest, RegisterResponse } from "./types";

const API_ROUTE = import.meta.env.VITE_API_URL;

const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await http.post(`${API_ROUTE}/auth/register`, data);
  return response.data;
};

export const ApiService = {
  register,
};
