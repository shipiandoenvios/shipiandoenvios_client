import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { cookies } from "next/headers";
import { UserInfo } from "../../store/store";
import { NextResponse } from "next/server";

// Constantes para JWT
const JWT_SECRET = process.env.JWT_SECRET || "sopy-secret-key";
const TOKEN_EXPIRY = "7d"; // 7 días
const COOKIE_NAME = "sopy-auth-token";

// Payload del token
interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

// Genera un token JWT
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
}

// Verifica un token JWT
export function verifyToken(token: string): JwtPayload | null {
  try {
    // Verificar si el token es válido
    if (!token || token === "undefined" || token === "null") {
      console.log("Token inválido:", token);
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Verificar que el payload tenga la estructura esperada
    if (!decoded || !decoded.userId || !decoded.email || !decoded.role) {
      console.log("Token con estructura inválida:", decoded);
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Error al verificar token:", error);
    return null;
  }
}

// Establece una cookie con el token usando next/headers
export async function setAuthCookie(
  token: string,
  rememberMe: boolean = false
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    // Si remember me está activo, dura 7 días, sino expira al cerrar el navegador
    maxAge: rememberMe ? 60 * 60 * 24 * 7 : undefined,
  });
}

// Elimina la cookie de autenticación
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Obtiene el token de la cookie
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// Para compatibilidad con respuestas HTTP estándar
export function setAuthCookieInResponse(
  response: NextResponse,
  token: string,
  rememberMe: boolean = false
): NextResponse {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: rememberMe ? 60 * 60 * 24 * 7 : undefined,
  });

  return response;
}

// Genera payload desde la información de usuario
export function generatePayloadFromUser(user: UserInfo): JwtPayload {
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
}
