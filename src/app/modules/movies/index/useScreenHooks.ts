import { useState, useEffect } from "react";
import { ApiService } from "./api";
import { useSpinner } from "../../../context/SpinnerContext";
import { useGlobal } from "../../../context/GlobalContext";
import type { ApiError } from "../../../shared/types";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../shared/types";
import Swal from "sweetalert2";
import { AlertService } from "../../../shared/alert";

export default function useScreenHooks() {
  const { user } = useGlobal();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errors, setErrors] = useState<ApiError[] | null>(null);
  const { show, hide, isLoading } = useSpinner();
  const navigate = useNavigate();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Lista de Películas";

    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      if (!isLoading) show();

      const response = await ApiService.getMovies();
      setMovies(response.payload);
      hide();
    } catch (error) {
      setErrors(error as ApiError[]);
    }
  };

  const handleCardClick = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const isSelected = (movieId: number) => selectedMovieId === movieId;

  const getSelectedMovie = () =>
    movies.find((movie) => movie.id === selectedMovieId);

  const handleDoubleClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleModify = () => {
    if (!selectedMovieId) return;
    navigate(`/movies/edit/${selectedMovieId}`);
  };

  const handleBlock = async () => {
    if (!selectedMovieId) return;
    try {
      if (!isLoading) show();

      const response = await ApiService.blockMovie(selectedMovieId);
      await AlertService.showSuccess(response.message);
      await fetchMovies();
    } catch (errorResponse) {
      await AlertService.showError(errorResponse as ApiError[]);
    }
  };

  const handleDelete = () => {
    if (!selectedMovieId) return;

    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar esta película?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!isLoading) show();

          const response = await ApiService.deleteMovie(selectedMovieId);
          await AlertService.showSuccess(response.message);
          await fetchMovies();
        } catch (errorResponse) {
          await AlertService.showError(errorResponse as ApiError[]);
        }
      }
    });
  };

  const handleCreate = () => {
    navigate(`/movies/create`);
  };

  const selectedMovie = getSelectedMovie();
  const isBlocked = selectedMovie?.blocked;

  return {
    movies,
    isLoading,
    user,
    errors,
    selectedMovieId,
    isBlocked,
    handleCardClick,
    isSelected,
    handleDoubleClick,
    handleModify,
    handleBlock,
    handleDelete,
    handleCreate,
  };
}
