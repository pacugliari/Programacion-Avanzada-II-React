import { useState, useEffect, type FormEvent } from "react";
import { ApiService } from "./api";
import { useGlobal } from "../../../GlobalContext";
import { useSpinner } from "../../../shared/SpinnerContext";
import { useNavigate } from "react-router-dom";

export default function useScreenHooks() {
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

  return { email, password, setEmail, setPassword, handleSubmit };
}
