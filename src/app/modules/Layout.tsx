import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useGlobal } from "../GlobalContext";

export default function Layout() {
  const { user, logout } = useGlobal();
  const navigate = useNavigate();
  
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
    navigate("/login"); // Ahora sí, en contexto de Router
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-secondary">
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
              <h1 className="mb-0">
                <NavLink
                  to="/movies"
                  className="text-white text-decoration-none"
                >
                  🎬 Trailerflix
                </NavLink>
              </h1>
            </div>

            {user && (
              <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center gap-3">
                <span className="text-white">👤 {user.name}</span>
                <form onSubmit={handleLogout} className="d-inline">
                  <button
                    type="submit"
                    className="btn btn-outline-light btn-sm"
                  >
                    Cerrar sesión
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mt-4 d-flex align-items-center justify-content-center">
        <Outlet />
      </main>

      <footer className="mt-2 text-center text-muted">
        <p>
          &copy; {new Date().getFullYear()} Trailerflix. Todos los derechos
          reservados.
        </p>
        <p>
          Desarrollado por{" "}
          <a
            href="https://www.linkedin.com/in/pablo-alberto-cugliari-b092b9269/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pablo Alberto Cugliari
          </a>
        </p>
      </footer>
    </div>
  );
}
