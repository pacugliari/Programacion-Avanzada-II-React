export type Role = 'admin' | 'usuario'

export type ApiErrorResponse = {
  message?: string;
  errors?: Array<string | { [key: string]: string }>;
};

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  payload: T;
}