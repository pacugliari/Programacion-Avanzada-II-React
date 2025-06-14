import React, { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "./api";
import { useGlobal } from "../../../GlobalContext";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../../shared/SpinnerContext";

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useGlobal();
  const { show } = useSpinner();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    show();
    const response = await ApiService.login({ email, password });
    login(response.payload.token, response.payload.user);
    navigate("/movies");
  }

  useEffect(() => {
    document.title = "Iniciar Sesión";
  }, []);

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="login-container bg-dark text-white p-4 rounded shadow col-10 col-md-6">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control bg-light text-dark border-0"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control bg-light text-dark border-0"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-outline-light">
              Entrar
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small>
            <Link to="/register" className="text-light text-decoration-none">
              ¿No tenés cuenta? Registrate
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
