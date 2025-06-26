export type Role = 'admin' | 'usuario'

export type ApiError = { [key: string]: string };


export type ApiErrorResponse = {
  message?: string;
  errors?: ApiError[];
};

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  payload: T;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}
