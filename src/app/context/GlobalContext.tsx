import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  type AuthUser,
  loadAuth,
  saveAuth,
  clearAuth,
} from "../shared/auth-storage";

type GlobalContextType = {
  token: string | null;
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const { token, user } = loadAuth();
    setToken(token);
    setUser(user);
  }, []);

  useEffect(() => {
    if (token && user) {
      saveAuth({ token, user });
    }
  }, [token, user]);

  const login = (token: string, user: AuthUser) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuth();
  };

  return (
    <GlobalContext.Provider value={{ token, user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal debe usarse dentro de <GlobalProvider>");
  return ctx;
}
