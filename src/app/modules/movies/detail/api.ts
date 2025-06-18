import http from "../../../shared/http";
import type { ApiResponse } from "../../../shared/types";
import type { Movie } from "../shared/types";

const API_ROUTE = import.meta.env.VITE_API_URL;

export type GetMovieByIdResponse = ApiResponse<Movie>;

const getMovieById = async (id: number): Promise<GetMovieByIdResponse> => {
  const response = await http.get(`${API_ROUTE}/movies/${id}`);
  return response.data;
};

export const ApiService = {
  getMovieById,
};
