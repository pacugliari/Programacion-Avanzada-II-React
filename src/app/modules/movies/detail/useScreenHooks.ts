import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpinner } from "../../../context/SpinnerContext";
import type { ApiErrorResponse } from "../../../shared/types";
import type { Movie } from "../shared/types";
import { ApiService } from "./api";

export default function useScreenHooks() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [errors, setErrors] = useState<ApiErrorResponse | null>(null);

  const { show, hide, isLoading } = useSpinner();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Detalle Película";
    const fetchMovie = async () => {
      if (!id) return;

      try {
        if (!isLoading) show();

        const response = await ApiService.getMovieById(Number(id));
        setMovie(response.payload);
        hide();
      } catch (error) {
        setErrors(error as ApiErrorResponse);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, errors, navigate };
}
