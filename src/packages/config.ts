/**
 * Configuración centralizada para la aplicación
 */

// URL base para la API
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

// Función simple para obtener la URL completa
export function getApiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}
