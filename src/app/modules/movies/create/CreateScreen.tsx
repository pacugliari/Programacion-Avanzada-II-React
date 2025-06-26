import React from "react";

import useScreenHooks from "./useScreenHooks";
import { CategoryType } from "../shared/types";

export const CreateScreen: React.FC = () => {
  const {
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
  } = useScreenHooks();

  return (
    <>
      {!isLoading && !errors && (
        <div className="flex-column bg-white card p-2 top-0 col-12 col-md-10">
          <div
            className="mb-4 d-flex align-items-center position-sticky p-2"
            style={{ top: 0, zIndex: 1000, background: "white" }}
          >
            <button
              onClick={() => navigate("/movies")}
              className="btn btn-secondary d-flex justify-content-center align-items-center"
            >
              <span className="material-icons me-2">arrow_back</span>
            </button>
            <h1 className="ms-3 mb-0">Crear Película</h1>
          </div>

          <form
            ref={formRef}
            className="row g-3 needs-validation"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="col-12 d-flex justify-content-center mb-3">
              <div>
                <img
                  src={posterPreview}
                  alt="Vista previa del Poster"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "200px",
                    border: "1px solid #ddd",
                    padding: "5px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="poster" className="form-label">
                Poster (*)
              </label>
              <input
                type="file"
                className="form-control"
                id="poster"
                name="poster"
                accept=".jpg, .jpeg, .png, .gif"
                required
                onChange={handlePosterChange}
              />
              <div className="invalid-feedback">Este campo es requerido</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Título (*)
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div className="invalid-feedback">Este campo es requerido</div>
            </div>

            <div className="col-12">
              <label htmlFor="summary" className="form-label">
                Resumen (*)
              </label>
              <textarea
                className="form-control"
                id="summary"
                name="summary"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              ></textarea>
              <div className="invalid-feedback">Este campo es requerido</div>
            </div>

            <div className="col-md-4">
              <label htmlFor="category_id" className="form-label">
                Categoría (*)
              </label>
              <select
                id="category_id"
                name="category_id"
                className="form-select"
                value={categoryId}
                required
                onChange={(e) => {
                  setCategoryId(Number(e.target.value));
                  setCategoria(
                    e.target.options[
                      e.target.selectedIndex
                    ].text.toLowerCase() as CategoryType
                  );
                }}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.descripcion}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Este campo es requerido</div>
            </div>

            <div className="col-md-4">
              <label htmlFor="cantidadTemporadas" className="form-label">
                Temporadas (*)
              </label>
              <input
                type="number"
                className="form-control"
                id="cantidadTemporadas"
                name="cantidadTemporadas"
                min={1}
                value={temporadas}
                onChange={(e) => setTemporadas(Number(e.target.value))}
                required={categoria === "serie"}
                disabled={categoria !== "serie"}
              />
              <div className="invalid-feedback">Este campo es requerido</div>
            </div>

            <div className="col-md-4">
              <label htmlFor="trailer" className="form-label">
                Link de Trailer
              </label>
              <input
                type="text"
                className="form-control"
                id="trailer"
                name="trailer"
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="genres" className="form-label">
                Géneros (*)
              </label>
              <select
                multiple
                className="form-select"
                id="genres"
                name="genres[]"
                value={selectedGenres.map(String)}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, (opt) =>
                    Number(opt.value)
                  );
                  setSelectedGenres(values);
                }}
                required
              >
                {genres.map((g) => (
                  <option key={g.idGenero} value={g.idGenero}>
                    {g.descripcion}
                  </option>
                ))}
              </select>
              <small className="text-muted">
                Ctrl (Windows) o Cmd (Mac) para selección múltiple
              </small>
              <div className="invalid-feedback">Este campo es requerido</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="actors" className="form-label">
                Actores (*)
              </label>
              <select
                multiple
                className="form-select"
                id="actors"
                name="actors[]"
                value={selectedActors.map(String)}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, (opt) =>
                    Number(opt.value)
                  );
                  setSelectedActors(values);
                }}
                required
              >
                {actors.map((a) => (
                  <option key={a.idActor} value={a.idActor}>
                    {a.nombre}
                  </option>
                ))}
              </select>
              <small className="text-muted">
                Ctrl (Windows) o Cmd (Mac) para selección múltiple
              </small>
              <div className="invalid-feedback">Este campo es requerido</div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Guardar Película
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
