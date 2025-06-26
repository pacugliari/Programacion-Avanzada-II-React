import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./modules/Layout";
import LoginScreen from "./modules/auth/login/LoginScreen";
import { IndexScreen } from "./modules/movies/index/IndexScreen";
import RegisterScreen from "./modules/auth/register/RegisterScreen";
import { TokenGuard } from "./shared/token-guard";
import DetailScreen from "./modules/movies/detail/DetailScreen";
import { CreateScreen } from "./modules/movies/create/CreateScreen";
import { EditScreen } from "./modules/movies/edit/EditScreen";

export function Router() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/movies" replace />} />
        <Route path="login" element={<LoginScreen key={location.key} />} />
        <Route
          path="register"
          element={<RegisterScreen key={location.key} />}
        />

        <Route element={<TokenGuard />}>
          <Route path="movies" element={<IndexScreen key={location.key} />} />
          <Route
            path="movies/create"
            element={<CreateScreen key={location.key} />}
          />
          <Route
            path="movies/edit/:id"
            element={<EditScreen key={location.key} />}
          />
          <Route
            path="movies/:id"
            element={<DetailScreen key={location.key} />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Route>
    </Routes>
  );
}
