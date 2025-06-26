import http, { ContentTypes } from "../../../shared/http";
import type { ApiResponse } from "../../../shared/types";
import type { Movie } from "../shared/types";

const API_ROUTE = import.meta.env.VITE_API_URL;

interface CreateMovieRequest {
  title: string;
  category_id: number[];
  summary: string;
  genres: number[];
  actors: number[];
  cantidadTemporadas: number | 'N/A';
  trailer: string;
  poster: File;
}
export type CreateMovieResponse = ApiResponse<Movie | null>;

const createMovie = async (
  data: CreateMovieRequest
): Promise<CreateMovieResponse> => {
  const response = await http.post(`${API_ROUTE}/movies`, data, {
    headers: ContentTypes.formData,
  });
  return response.data;
};

export const ApiService = {
  createMovie,
};
