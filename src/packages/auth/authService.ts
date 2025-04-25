import { LoginFormValues } from "./schemas";
import { UserInfo } from "../../store/store";

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
      // Verificar credenciales
      const result = { success: false };

      if (!result.success) {
        return {
          success: false,
          message: "Credenciales inválidas",
        };
      }

      // const user = result.user;

      // Verificar si la cuenta está activa
      // if (!user || !user.active) {
      //   return {
      //     success: false,
      //     message: "Tu cuenta está desactivada. Contacta al administrador.",
      //   };
      // }

      // Devolver resultado exitoso
      return {
        success: true,
        user: null,
        message: "Autenticación exitosa",
      };
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      return {
        success: false,
        message: "Error al procesar la solicitud",
      };
    }
  },

  /**
   * Extraer información del usuario para el cliente
   */
  extractUserInfo(user: UserInfo): UserInfo {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      active: user.active,
      empresaId: user.empresaId,
      companyId: user.companyId,
      rut: user.rut,
      giroType: user.giroType,
      trialEnd: user.trialEnd,
      planActive: user.planActive,
    };
  },

  /**
   * Obtener la ruta de redirección después del login según el rol
   */
  getRedirectPathByRole(role: string): string {
    switch (role) {
      case "ADMIN":
        return "/app/dashboard";
      case "EMPRESA":
        return "/app/accountant";
      case "EMPLOYEE":
        return "/app/accountant";
      case "USER":
      default:
        return "/app/client";
    }
  },
};
