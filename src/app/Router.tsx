import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./modules/Layout";
import LoginScreen from "./modules/auth/login/LoginScreen";
import { IndexScreen } from "./modules/movies/index/IndexScreen";
import RegisterScreen from "./modules/auth/register/RegisterScreen";
import { TokenGuard } from "./shared/token-guard";
import DetailScreen from "./modules/movies/detail/DetailScreen";
import { CreateScreen } from "./modules/movies/create/CreateScreen";
import { EditScreen } from "./modules/movies/edit/EditScreen";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/movies" replace />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />

          <Route element={<TokenGuard />}>
            <Route index path="/movies" element={<IndexScreen />} />
            <Route path="movies/create" element={<CreateScreen />} />
            <Route path="movies/edit/:id" element={<EditScreen />} />
            <Route path="movies/:id" element={<DetailScreen />} />
          </Route>

          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
