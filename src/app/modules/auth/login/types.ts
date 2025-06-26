import type { Role } from "../../../shared/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  payload: { token: string; user: User };
}

interface User {
  role: Role;
  name: string;
  email: string;
}
