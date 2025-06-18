import http from "../../../shared/http";
import type { GetMoviesResponse } from "./types";

const API_ROUTE = import.meta.env.VITE_API_URL;

const getMovies = async (): Promise<GetMoviesResponse> => {
  const response = await http.get(`${API_ROUTE}/movies`);
  return response.data;
};

export const ApiService = {
  getMovies,
};
