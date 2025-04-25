"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, FileText, Menu, X, LogOut, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/packages/design-system/components/ui/button";
import { useAuthStore } from "@/store/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/packages/design-system/components/ui/avatar";
import { getApiUrl } from "@/packages/config";

// Tipos para los permisos
type UserPermission = {
  id: string;
  permission: string;
  resource: string;
  resourceId?: string | null;
  module?: string | null;
  viewName?: string | null;
};

type UserWithPermissions = {
  id: string;
  role: string;
  permissions?: UserPermission[];
  [key: string]: any;
};

const menuItems = [
  {
    title: "Panel Principal",
    icon: <Home className="w-5 h-5" />,
    href: "/client/dashboard",
    permission: "VIEW_DASHBOARD",
    resource: "DASHBOARD",
  },
  {
    title: "RCV",
    icon: <FileText className="w-5 h-5" />,
    href: "/client/rcv",
    permission: "VIEW_RCV_FORMS",
    resource: "RCV",
  },
  {
    title: "RH",
    icon: <FileText className="w-5 h-5" />,
    href: "/client/rh",
    permission: "VIEW_RH_FORMS",
    resource: "RH",
  },
  {
    title: "IUSC",
    icon: <FileText className="w-5 h-5" />,
    href: "/client/iusc",
    permission: "VIEW_IUSC_FORMS",
    resource: "IUSC",
  },
  {
    title: "PPM",
    icon: <FileText className="w-5 h-5" />,
    href: "/client/ppm",
    permission: "VIEW_PPM_FORMS",
    resource: "PPM",
  },
  {
    title: "Retención de IVA",
    icon: <FileText className="w-5 h-5" />,
    href: "/client/retencion-iva",
    permission: "VIEW_RETENCION_IVA_FORMS",
    resource: "RETENCION",
  },
  {
    title: "Cambiar contraseña",
    icon: <Key className="w-5 h-5" />,
    href: "/client/change-password",
    permission: "VIEW_RETENCION_IVA_FORMS",
    resource: "RETENCION",
  },
];

export function ClientSidebar() {
  const { user, logout } = useAuthStore();
  const currentPathname = usePathname();
  const router = useRouter();
  const locale = currentPathname.split("/")[1];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string | undefined | null): string => {
    if (!name) return "U";

    const names = name.trim().split(/\s+/);

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Depuración detallada del usuario y sus permisos
  useEffect(() => {
    if (user) {
      console.log("[USER STORE]", user);
      console.log("[USER ROLE]", user.role);

      // Verificar si user es compatible con UserWithPermissions
      const userWithPermissions = user as unknown as UserWithPermissions;

      if (userWithPermissions.permissions) {
        console.log(
          `[USER PERMISSIONS] Total: ${userWithPermissions.permissions.length}`
        );
        userWithPermissions.permissions.forEach((perm: UserPermission) => {
          console.log(`- ${perm.permission} / ${perm.resource}`);
        });
      } else {
        console.log("[USER PERMISSIONS] No tiene permisos definidos");
      }
    } else {
      console.log("[USER STORE] No hay usuario");
    }
  }, [user]);

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [currentPathname]);

  // Evitar scroll del body cuando el menú está abierto en móviles
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón para abrir el menú en dispositivos móviles */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
        aria-label="Menú"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay oscuro cuando el menú está abierto en móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar en desktop y drawer en móviles */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-gray-100 
          overflow-y-auto shadow-lg z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:shadow-none md:top-16 md:z-0`}
      >
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center md:hidden">
          <h2 className="font-bold text-lg">Menú</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 flex flex-col h-full">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const appRoute = `/app${item.href}`;
              const isActive = currentPathname.includes(appRoute);
              const fullRoute = `/${locale}/app${item.href}`;

              return (
                <li key={item.href}>
                  <Link
                    href={fullRoute}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(fullRoute);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#FFB800] text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-4 border-t border-gray-200 mt-6">
            <div className="flex items-center gap-3 px-4 mb-3">
              <Avatar>
                <AvatarImage src="" alt={user?.name || "Usuario"} />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {user?.name || "Usuario"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault();

                // Limpiar el estado de autenticación en el store de Zustand
                logout();

                try {
                  // Llamar al endpoint de logout para limpiar cookies del servidor
                  const response = await fetch(getApiUrl("/api/auth/logout"), {
                    method: "POST",
                    credentials: "include",
                  });

                  if (!response.ok) {
                    console.error("Error en logout:", await response.text());
                  }
                } catch (error) {
                  console.error("Error al cerrar sesión:", error);
                } finally {
                  // Redireccionar a la página de login independientemente del resultado
                  // Usar setTimeout para asegurar que el estado se limpie antes de redireccionar
                  setTimeout(() => {
                    // Obtener el idioma actual de la URL
                    const locale =
                      window.location.pathname.split("/")[1] || "es";
                    window.location.href = `/${locale}/auth/login`;
                  }, 100);
                }
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
