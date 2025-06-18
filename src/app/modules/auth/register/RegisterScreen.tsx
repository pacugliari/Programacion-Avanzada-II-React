import React from "react";
import { Link } from "react-router-dom";
import useScreenHooks from "./useScreenHooks";

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = useScreenHooks();
  
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="login-container bg-dark text-white p-4 rounded shadow col-10 col-md-6">
        <h3 className="text-center mb-4">Registrarse</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              className="form-control bg-light text-dark border-0"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="form-control bg-light text-dark border-0"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-outline-light">
              Registrarme
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small>
            <Link to="/login" className="text-light text-decoration-none">
              ¿Ya tenés cuenta? Iniciá sesión
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
