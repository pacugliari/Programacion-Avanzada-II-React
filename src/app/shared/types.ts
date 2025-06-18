export type Role = 'admin' | 'usuario'

export type ApiErrorResponse = {
  message?: string;
  errors?: Array<string | { [key: string]: string }>;
};