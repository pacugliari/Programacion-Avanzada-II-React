import React, { useEffect, useState } from "react";
import { useGlobal } from "../../../GlobalContext";
import { ApiService } from "./api";
import type { Movie } from "./types";
import { useSpinner } from "../../../shared/SpinnerContext";

export const IndexScreen: React.FC = () => {
  const { user } = useGlobal();
  const [movies, setMovies] = useState<Movie[]>([]);
  const { show, hide, isLoading } = useSpinner();

  const loadData = async () => {
    if (!isLoading) show();

    const response = await ApiService.getMovies();
    setMovies(response.payload);
    hide();
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="flex-column bg-white card p-2">
          <div
            className="mb-4 p-2 sticky-top bg-white"
            style={{ zIndex: 1000 }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                  <h1 className="mb-0">Películas</h1>
                </div>
                <div className="col-12 col-md-6 d-flex flex-wrap justify-content-md-end gap-2">
                  {user?.role === "admin" && (
                    <button
                      id="btnBlock"
                      className="btn btn-primary d-flex align-items-center"
                      disabled
                    >
                      <span className="material-icons me-1">lock</span>
                      <span className="d-none d-md-inline">Bloquear</span>
                    </button>
                  )}
                  <button
                    id="btnCreate"
                    className="btn btn-success d-flex align-items-center"
                  >
                    <span className="material-icons me-1">add</span>
                    <span className="d-none d-md-inline">Crear</span>
                  </button>
                  <button
                    id="btnModify"
                    className="btn btn-warning d-flex align-items-center"
                    disabled
                  >
                    <span className="material-icons me-1">edit</span>
                    <span className="d-none d-md-inline">Modificar</span>
                  </button>
                  <button
                    id="btnDelete"
                    className="btn btn-danger d-flex align-items-center"
                    disabled
                  >
                    <span className="material-icons me-1">delete</span>
                    <span className="d-none d-md-inline">Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 me-2 ms-2">
            {movies.map((movie) => (
              <div className="col" key={movie.id}>
                <div
                  className="card h-100 shadow-sm movie-card"
                  data-movie-id={movie.id}
                  data-blocked={movie.blocked ? 1 : 0}
                >
                  {/* Enlace a detalle si usás react-router, reemplazá por <Link> */}
                  <span>
                    <div
                      className="card-img-container"
                      style={{ height: 300, overflow: "hidden" }}
                    >
                      <img
                        src={movie.poster}
                        className="card-img-top"
                        alt={movie.titulo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </span>
                  <div className="card-body">
                    <h5 className="card-title text-center d-flex justify-content-center align-items-center gap-2">
                      <span className="text-dark">{movie.titulo}</span>
                      {movie.blocked ? (
                        <span
                          className="material-icons text-danger"
                          title="Película bloqueada"
                        >
                          lock
                        </span>
                      ) : null}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default IndexScreen;
