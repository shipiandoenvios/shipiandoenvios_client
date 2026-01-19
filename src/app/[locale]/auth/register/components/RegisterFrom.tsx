"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import {
  MoveRight,
  MailIcon,
  LockIcon,
  Eye,
  EyeOff,
  UserIcon,
  LocateIcon,
} from "lucide-react";
import { RegisterFormValues, registerSchema } from "@/packages/auth/schemas";
import { useAuthStore } from "@/store/store";
import { getApiUrl } from "@/packages/config";
import { fetchJson } from '@/lib/api';
import { LocationAutocomplete } from "./LocationAutocomplete";
import { UserInfo } from "@/store/store";

interface RegisterResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserInfo;
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const params = useParams();
  const locale = params.locale as string; // Obtener el idioma actual
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchJson(getApiUrl(`/api/auth/register`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }) as RegisterResponse;

      if (!result.success) {
        setError(result.message || "Error al registrarse");
        return;
      }

      if (!result.token || !result.user) {
        setError("Respuesta inválida del servidor");
        return;
      }

      setAuth(true, result.token, result.user);

      await new Promise((resolve) => setTimeout(resolve, 300));

      window.location.href = "/";
    } catch (err) {
      setError("Error de conexión. Intenta de nuevo más tarde.");
      console.error("Error en el registro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-bold text-gray-700 var(--font-nunito)"
        >
          Nombre y Apellido
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-[#1E4063]" />
          </div>
          <input
            id="name"
            {...register("name")}
            type="name"
            className={`pl-10 block w-full px-4 py-2.5 border ${
              errors.name ? "border-red-300" : "border-gray-200"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-[#7dd3c8] focus:border-transparent var(--font-nunito) transition-all duration-200`}
            placeholder="Juan Perez"
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-bold text-gray-700 var(--font-nunito)"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon className="h-5 w-5 text-[#1E4063]" />
          </div>
          <input
            id="email"
            {...register("email")}
            type="email"
            className={`pl-10 block w-full px-4 py-2.5 border ${
              errors.email ? "border-red-300" : "border-gray-200"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-[#7dd3c8] focus:border-transparent var(--font-nunito) transition-all duration-200`}
            placeholder="correo@ejemplo.com"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-bold text-gray-700 var(--font-nunito)"
        >
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-[#1E4063]" />
          </div>
          <input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={`pl-10 block w-full px-4 py-2.5 border ${
              errors.password ? "border-red-300" : "border-gray-200"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-[#7dd3c8] focus:border-transparent var(--font-nunito) transition-all duration-200`}
            placeholder="********"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-bold text-gray-700 var(--font-nunito)"
        >
          Confirmar Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-[#1E4063]" />
          </div>
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className={`pl-10 block w-full px-4 py-2.5 border ${
              errors.confirmPassword ? "border-red-300" : "border-gray-200"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-[#7dd3c8] focus:border-transparent var(--font-nunito) transition-all duration-200`}
            placeholder="********"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={toggleConfirmPasswordVisibility}
            aria-label={
              showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <LocationAutocomplete
          value={watch("location")}
          onChange={(value) => setValue("location", value)}
          error={errors.location?.message}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold var(--font-nunito) text-white bg-[#1E4063] hover:bg-[#0798F0] transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            "Iniciando sesión..."
          ) : (
            <>
              Registrarse <MoveRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
