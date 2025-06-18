import React from "react";
import useScreenHooks from "./useScreenHooks";
import "./styles.css";

export const IndexScreen: React.FC = () => {
  const {
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
  } = useScreenHooks();

  return (
    <>
      {!isLoading && !errors && (
        <div className="flex-column bg-white card p-2 top-0 col-12 col-md-12">
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
                      onClick={handleBlock}
                      disabled={!selectedMovieId}
                    >
                      <span className="material-icons me-1">
                        {isBlocked ? "lock_open" : "lock"}
                      </span>
                      <span className="d-none d-md-inline">
                        {isBlocked ? "Desbloquear" : "Bloquear"}
                      </span>
                    </button>
                  )}
                  <button
                    id="btnCreate"
                    className="btn btn-success d-flex align-items-center"
                    onClick={handleCreate}
                  >
                    <span className="material-icons me-1">add</span>
                    <span className="d-none d-md-inline">Crear</span>
                  </button>
                  <button
                    id="btnModify"
                    className="btn btn-warning d-flex align-items-center"
                    onClick={handleModify}
                    disabled={!selectedMovieId}
                  >
                    <span className="material-icons me-1">edit</span>
                    <span className="d-none d-md-inline">Modificar</span>
                  </button>
                  <button
                    id="btnDelete"
                    className="btn btn-danger d-flex align-items-center"
                    onClick={handleDelete}
                    disabled={!selectedMovieId}
                  >
                    <span className="material-icons me-1">delete</span>
                    <span className="d-none d-md-inline">Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 me-2 ms-2">
            {movies.length === 0 ? (
              <div className="col-12 text-center mt-4 w-100">
                <p className="text-muted fs-5">No hay películas disponibles.</p>
              </div>
            ) : (
              movies.map((movie) => (
                <div className="col" key={movie.id}>
                  <div
                    className={`card h-100 shadow-sm movie-card ${
                      isSelected(movie.id) ? "selected-card" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(movie.id);
                    }}
                    onDoubleClick={() => handleDoubleClick(movie.id)}
                    data-movie-id={movie.id}
                    data-blocked={movie.blocked ? 1 : 0}
                  >
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
                    <div className="card-body">
                      <h5 className="card-title text-center d-flex justify-content-center align-items-center gap-2">
                        <span className="text-dark">{movie.titulo}</span>
                        {movie.blocked && (
                          <span
                            className="material-icons text-danger"
                            title="Película bloqueada"
                          >
                            lock
                          </span>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default IndexScreen;
