"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { authService } from "@/packages/auth/authService";

export function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      const data = await authService.logout();

      if (!data.success) {
        throw new Error(data.message || "Error al cerrar sesión");
      }

      // Limpiar estado local
      logout();

      // Mostrar mensaje de éxito
      toast.success("Sesión cerrada correctamente");

      // Redireccionar al login
      router.push("/auth/login");
    } catch (error) {
      console.error("Error en logout:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      className="hover:bg-[#FFB800] hover:text-white cursor-pointer"
      title="Cerrar sesión"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
}
