import http from "../../../shared/http";
import type { ApiResponse } from "../../../shared/types";
import type { Movie } from "../shared/types";

const API_ROUTE = import.meta.env.VITE_API_URL;

export type GetMoviesResponse = ApiResponse<Movie[]>;
export type DeleteMovieResponse = ApiResponse<null>;
export type BlockMovieResponse = ApiResponse<null>;

const getMovies = async (): Promise<GetMoviesResponse> => {
  const response = await http.get(`${API_ROUTE}/movies`);
  return response.data;
};

const deleteMovie = async (id: number): Promise<DeleteMovieResponse> => {
  const response = await http.delete(`${API_ROUTE}/movies/${id}`);
  return response.data;
};

const blockMovie = async (id: number): Promise<BlockMovieResponse> => {
  const response = await http.post(`${API_ROUTE}/movies/block/${id}`);
  return response.data;
};

export const ApiService = {
  getMovies,
  deleteMovie,
  blockMovie
};
