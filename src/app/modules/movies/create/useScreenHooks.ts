import { useState, useEffect, type FormEvent, useRef } from "react";
import { ApiService } from "./api";
import { useSpinner } from "../../../context/SpinnerContext";
import { useNavigate } from "react-router-dom";
import type { ApiError, ApiErrorResponse } from "../../../shared/types";
import { SharedApiService } from "../shared/api";
import type { Genre, Category, Actor, CategoryType } from "../shared/types";
import { AlertService } from "../../../shared/alert";
import { usePosterUpload } from "../shared/usePosterUpload";

export default function useScreenHooks() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { show, hide, isLoading } = useSpinner();
  const [categoria, setCategoria] = useState<CategoryType | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [errors, setErrors] = useState<ApiErrorResponse | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [temporadas, setTemporadas] = useState<number | "">("");
  const [trailer, setTrailer] = useState("N/A");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedActors, setSelectedActors] = useState<number[]>([]);
  const { posterPreview, posterFile, handlePosterChange } = usePosterUpload();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    try {
      if (!isLoading) show();

      const response = await ApiService.createMovie({
        title,
        category_id: [categoryId as number],
        summary,
        genres: selectedGenres,
        actors: selectedActors,
        trailer,
        poster: posterFile as File,
      });
      const alertResponse = await AlertService.showSuccess(response.message);
      if (alertResponse.value) navigate("/movies");
    } catch (errorResponse) {
      await AlertService.showError(errorResponse as ApiError[]);
    }
  };

  useEffect(() => {
    document.title = "Crear Película";

    const fetchData = async () => {
      try {
        if (!isLoading) show();

        const [actorsRes, categoriesRes, genresRes] = await Promise.all([
          SharedApiService.getActors(),
          SharedApiService.getCategories(),
          SharedApiService.getGenres(),
        ]);

        setActors(actorsRes.payload);
        setCategories(categoriesRes.payload);
        setGenres(genresRes.payload);
        hide();
      } catch (error) {
        setErrors(error as ApiErrorResponse);
      }
    };

    fetchData();
  }, []);

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
    temporadas,
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
    setTemporadas,
    setTrailer,
    setSelectedGenres,
    setSelectedActors,
    handleSubmit,
    navigate,
  };
}
