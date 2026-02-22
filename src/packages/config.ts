/**
 * Configuración centralizada para la aplicación
 */

// URL base para la API
// Preferimos `NEXT_PUBLIC_BASE_URL` por compatibilidad, y si no existe, usamos `NEXT_PUBLIC_API_URL` (plantilla en `.env.example`).
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "";

// Función simple para obtener la URL completa
export function getApiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}
