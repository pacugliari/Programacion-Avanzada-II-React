import http, { ContentTypes } from "../../../shared/http";
import type { ApiResponse } from "../../../shared/types";
import type { Movie } from "../shared/types";

const API_ROUTE = import.meta.env.VITE_API_URL;

interface UpdateMovieRequest {
  title: string;
  category_id: number[];
  summary: string;
  genres: number[];
  actors: number[];
  trailer: string;
  cantidadTemporadas: number | 'N/A';
  poster: File | undefined;
}
export type UpdateMovieResponse = ApiResponse<Movie | null>;

const updateMovie = async (
  id: number,
  data: UpdateMovieRequest
): Promise<UpdateMovieResponse> => {
  const response = await http.put(`${API_ROUTE}/movies/${id}`, data, {
    headers: ContentTypes.formData,
  });
  return response.data;
};

export const ApiService = {
  updateMovie,
};
