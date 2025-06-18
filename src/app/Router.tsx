import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./modules/Layout";
import LoginScreen from "./modules/auth/login/LoginScreen";
import { IndexScreen } from "./modules/movies/index/IndexScreen";
import RegisterScreen from "./modules/auth/register/RegisterScreen";
import { TokenGuard } from "./shared/token-guard";

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
          </Route>

          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
