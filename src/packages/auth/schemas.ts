import { z } from "zod";

// Esquema para validación de login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Ingresa un email válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100),
  rememberMe: z.boolean().optional().default(false),
});

// Definir el tipo de datos del formulario de login con rememberMe opcional
export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterFromValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  locaton: string;
};

// Esquema para validación de registro
export const registerSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Ingresa un email válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales",
      }
    ),
  confirmPassword: z.string(),
  location: z.string(),
});

// Definir el tipo de datos del formulario de registro
export type RegisterFormValues = z.infer<typeof registerSchema>;
