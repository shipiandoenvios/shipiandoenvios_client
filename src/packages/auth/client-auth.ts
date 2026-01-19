"use client";

import { UserInfo } from "@/store/store";

// Constantes (leer desde env; usar NEXT_PUBLIC_ prefix para que estén disponibles en el cliente)
const TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth-token";
const USER_KEY = process.env.NEXT_PUBLIC_USER_KEY || "sopy-auth-user";

/**
 * Guarda el token en localStorage
 */
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Guarda la información del usuario en localStorage
 */
export function saveUser(user: UserInfo): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Obtiene el token desde localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Obtiene la información del usuario desde localStorage
 */
export function getUser(): UserInfo | null {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Error al parsear usuario:", error);
    return null;
  }
}

/**
 * Limpia toda la información de autenticación
 */
export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Configura el header de autorización para las peticiones fetch
 */
export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/**
 * Verifica si el usuario está autenticado en el cliente
 */
export function isAuthenticated(): boolean {
  return !!getToken() && !!getUser();
}
