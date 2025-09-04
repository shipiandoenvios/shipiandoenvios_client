"use client";

import { LockIcon } from "lucide-react";
import { useAuthStore } from "@/store/store";
import { Button } from "@/packages/design-system/components/ui/button";
import { useState } from "react";

export default function AccessDenied() {
  const { logout } = useAuthStore();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const handleLogoutAndRedirect = async () => {
    setIsRedirecting(true);
    logout();
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center px-4">
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <LockIcon className="w-12 h-12 text-red-400" />
        <h1 className="text-2xl font-bold text-gray-800">Acceso denegado</h1>
        <p className="text-gray-600 text-center max-w-md">
          Tu periodo de prueba ha finalizado. Para seguir usando Sopy debes
          contratar un plan.
        </p>
        <Button
          onClick={handleLogoutAndRedirect}
          disabled={isRedirecting}
          className="mt-4 px-6 py-2 rounded-lg bg-amber-500 text-white font-bold hover:bg-amber-600 transition cursor-pointer"
        >
          {!isRedirecting ? "Ver planes y contratar" : "Redirigiendo..."}
        </Button>
      </div>
    </div>
  );
}
