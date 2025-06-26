import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ApiError, ApiErrorResponse } from "../../../shared/types";

import { SharedApiService } from "../shared/api";
import { useSpinner } from "../../../context/SpinnerContext";
import { AlertService } from "../../../shared/alert";
import type {
  Genre,
  Category,
  Actor,
  Movie,
  CategoryType,
} from "../shared/types";
import { usePosterUpload } from "../shared/usePosterUpload";
import { ApiService } from "./api";

export default function useScreenHooks() {
  const { id } = useParams();
  const movieId = Number(id);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { show, hide, isLoading } = useSpinner();
  const {
    posterPreview,
    setPosterPreview,
    posterFile,
    handlePosterChange,
    defaultPoster,
  } = usePosterUpload();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categoria, setCategoria] = useState<CategoryType | null>(null);
  const [cantidadTemporadas, setCantidadTemporadas] = useState<number | "N/A">("N/A");
  const [trailer, setTrailer] = useState("N/A");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedActors, setSelectedActors] = useState<number[]>([]);
  const [errors, setErrors] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    document.title = "Editar Película";

    const fetchData = async () => {
      try {
        show();

        const [movieRes, actorsRes, categoriesRes, genresRes] =
          await Promise.all([
            SharedApiService.getMovieById(movieId),
            SharedApiService.getActors(),
            SharedApiService.getCategories(),
            SharedApiService.getGenres(),
          ]);

        const movie: Movie = movieRes.payload;

        setTitle(movie.titulo);
        setSummary(movie.resumen);
        setCategoryId(movie.categoria[0]?.idCategoria ?? "");
        setCategoria(movie.categoria[0]?.descripcion ?? "pelicula");
        setCantidadTemporadas(Number(movie.temporadas) || "N/A");
        setTrailer(movie.trailer || "N/A");
        setSelectedGenres(movie.generos.map((g) => g.idGenero));
        setSelectedActors(movie.reparto.map((a) => a.idActor));
        setPosterPreview(movie.poster || defaultPoster);

        setActors(actorsRes.payload);
        setCategories(categoriesRes.payload);
        setGenres(genresRes.payload);
        hide();
      } catch (error) {
        setErrors(error as ApiErrorResponse);
        hide();
      }
    };

    if (movieId) {
      fetchData();
    }
  }, [movieId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    try {
      show();

      const response = await ApiService.updateMovie(movieId, {
        title,
        category_id: [categoryId as number],
        summary,
        genres: selectedGenres,
        actors: selectedActors,
        trailer,
        cantidadTemporadas,
        poster: posterFile ?? undefined,
      });

      const alertResponse = await AlertService.showSuccess(response.message);
      if (alertResponse.value) {
        navigate("/movies");
      }
    } catch (error) {
      await AlertService.showError(error as ApiError[]);
    } finally {
      hide();
    }
  };

  return {
    isLoading,
    errors,
    formRef,
    posterPreview,
    title,
    summary,
    categoryId,
    categories,
    categoria,
    cantidadTemporadas,
    trailer,
    genres,
    selectedGenres,
    actors,
    selectedActors,
    handlePosterChange,
    setTitle,
    setSummary,
    setCategoryId,
    setCategoria,
    setCantidadTemporadas,
    setTrailer,
    setSelectedGenres,
    setSelectedActors,
    handleSubmit,
    navigate,
  };
}
