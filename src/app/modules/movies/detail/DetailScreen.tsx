import React from "react";
import useScreenHooks from "./useScreenHooks";

const MovieDetail: React.FC = () => {
  const { movie, errors, navigate } = useScreenHooks();

  return (
    <>
      {movie && !errors && (
        <div className="flex-column bg-white card p-2 top-0 col-12 col-md-6">
          <div
            className="sticky-top bg-white d-flex align-items-center p-2 border-bottom"
            style={{ zIndex: 1030 }}
          >
            <button
              onClick={() => navigate("/movies")}
              className="btn btn-secondary me-3 d-flex align-items-center"
            >
              <span className="material-icons">arrow_back</span>
            </button>
            <h1 className="h4 m-0">Detalle Película</h1>
          </div>

          <h2 className="text-center mt-4">{movie.titulo}</h2>

          <div className="text-center mb-4">
            <img
              src={movie.poster}
              alt={`Poster de ${movie.titulo}`}
              className="img-fluid rounded shadow"
              style={{ height: "auto", maxHeight: "20rem" }}
            />
          </div>

          <div className="row justify-content-center">
            <div className="col-12">
              <p>
                <strong>Categoría:</strong> {movie.categoria[0]?.descripcion}
              </p>

              <p>
                <strong>Géneros:</strong>{" "}
                {movie.generos.map((g, index) => (
                  <span key={index}>
                    {g.descripcion}
                    {index < movie.generos.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p>
                <strong>Resumen:</strong> {movie.resumen}
              </p>
              <p>
                <strong>Temporadas:</strong> {movie.temporadas}
              </p>

              <p>
                <strong>Reparto:</strong>{" "}
                {movie.reparto.map((actor, index) => (
                  <span key={index}>
                    {actor.nombre}
                    {index < movie.reparto.length - 1 && ", "}
                  </span>
                ))}
              </p>

              {movie.trailer && movie.trailer !== "N/A" && (
                <p>
                  <strong>Trailer:</strong>{" "}
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Ver trailer
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
