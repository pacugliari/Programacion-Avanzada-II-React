import http from "../../../shared/http";
import type { ApiResponse } from "../../../shared/types";
import type { Actor, Category, Genre, Movie } from "../shared/types";

const API_ROUTE = import.meta.env.VITE_API_URL;

export type GetGenresResponse = ApiResponse<Genre[]>;
export type GetCategoriesResponse = ApiResponse<Category[]>;
export type GetActorsResponse = ApiResponse<Actor[]>;
export type GetMovieByIdResponse = ApiResponse<Movie>;

const getGenres = async (): Promise<GetGenresResponse> => {
  const response = await http.get(`${API_ROUTE}/genres`);
  return response.data;
};

const getCategories = async (): Promise<GetCategoriesResponse> => {
  const response = await http.get(`${API_ROUTE}/categories`);
  return response.data;
};

const getActors = async (): Promise<GetActorsResponse> => {
  const response = await http.get(`${API_ROUTE}/actors`);
  return response.data;
};

const getMovieById = async (id: number): Promise<GetMovieByIdResponse> => {
  const response = await http.get(`${API_ROUTE}/movies/${id}`);
  return response.data;
};

export const SharedApiService = {
  getGenres,
  getCategories,
  getActors,
  getMovieById
};
