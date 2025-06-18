export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name:string;
}

export interface RegisterResponse {
  message: string;
}

