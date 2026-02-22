import { LoginFormValues } from "./schemas";
import { UserInfo } from "../../store/store";
import { fetchJson } from "@/lib/api";
import { getApiUrl } from "@/packages/config";
import { AUTH_COOKIE_NAME, AUTH_CSRF_COOKIE_NAME } from "./constants";
import { emitAuthEvent } from '@/lib/auth-events';

// Resultado de autenticación
export interface AuthResult {
  success: boolean;
  user?: UserInfo | null;
  message?: string;
  token?: string;
}

// Servicio de autenticación
export const authService = {
  /**
   * Autenticar a un usuario con email y contraseña
   */
  async login({ email, password }: LoginFormValues): Promise<AuthResult> {
    try {
      const url = getApiUrl(`/api/auth/login`);
      const res = await fetchJson(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      } as RequestInit);
      // La API puede responder plano o envuelto en { data, meta }
      const payload = res?.data && typeof res.data === 'object' ? res.data : res;
      if (!payload || !payload.success) {
        return { success: false, message: payload?.message || res?.message || "Credenciales inválidas" };
      }
      const user = (payload as any).user as UserInfo | undefined | null;
      if (!user) return { success: false, message: "Respuesta inválida del servidor" };
      return { success: true, user: this.extractUserInfo(user), message: payload.message };
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      return {
        success: false,
        message: "Error al procesar la solicitud",
      };
    }
  },

  async logout() {
    try {
      const url = getApiUrl(`/api/auth/logout`);
      const res = await fetchJson(url, { method: 'POST' });
      // emit logout so other parts of the app can react
      try { emitAuthEvent('logout'); } catch (e) { /* ignore */ }
      return res;
    } catch (err) {
      // bubble up the error for commander to handle
      throw err;
    }
  },

  async refresh() {
    try {
      const url = getApiUrl(`/api/auth/refresh`);
      const res = await fetchJson(url, { method: 'POST' });
      return res;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Extraer información del usuario para el cliente
   */
  extractUserInfo(user: UserInfo): UserInfo {
    const rawRoles = (user as any).roles ?? ((user as any).role ? [ (user as any).role ] : []);
    const roles = Array.isArray(rawRoles)
      ? (rawRoles as any[]).map((r) => String(r).toUpperCase())
      : [];
    const normalizedRole = roles && roles.length > 0 ? roles[0] : (user.role ? String(user.role).toUpperCase() : undefined);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: normalizedRole ?? '',
      roles,
      active: user.active,
      empresaId: user.empresaId,
      companyId: user.companyId,
      rut: user.rut,
      giroType: user.giroType,
      trialEnd: user.trialEnd,
      planActive: user.planActive,
    };
  },

  getRedirectPathByRole(roleOrRoles: string | string[]): string {
    const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
    const priority = ["ADMIN", "WAREHOUSE", "CARRIER", "CLIENT", "USER", "STORE", "EMPRESA", "EMPLOYEE"];
    const pick = priority.find((p) => roles.includes(p));
    switch (pick) {
      case "ADMIN":
        return "/admin";
      case "WAREHOUSE":
        return "/warehouse";
      case "CARRIER":
        return "/carrier";
      case "EMPRESA":
      case "EMPLOYEE":
        return "/admin";
      case "USER":
      case "CLIENT":
      case "STORE":
      default:
        return "/user";
    }
  },
};
