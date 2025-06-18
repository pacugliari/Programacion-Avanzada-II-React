import type { Role } from "./types";

export interface AuthUser {
  name: string;
  email: string;
  role: Role
}

export interface AuthStorage {
  token: string | null;
  user: AuthUser | null;
}

const STORAGE_KEY = "trailerflix_auth";

export function saveAuth(auth: AuthStorage) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

export function loadAuth(): AuthStorage {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return { token: null, user: null };
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getToken(): string | null {
  return loadAuth().token;
}

export function getUser(): AuthUser | null {
  return loadAuth().user;
}
