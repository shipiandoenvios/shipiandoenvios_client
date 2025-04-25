"use client";

import { Link } from "@/packages/internationalization";
import { FileSpreadsheet } from "lucide-react";
import { LoginForm } from "./components/LoginForm";
import { useAuthStore } from "@/store/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  useEffect(() => {
    // Verificar si el usuario está logueado
    if (user) {
      // Redirigir según el rol
      if (user.role === "USER") {
        router.push(`/${locale}/app/client/dashboard`);
      } else if (user.role === "SUPER_ADMIN") {
        router.push(`/${locale}/app/dashboard`);
      } else {
        // ADMIN, EMPRESA, ACCOUNTANT, etc.
        router.push(`/${locale}/app/accountant/dashboard`);
      }
    }
  }, [user, router, locale]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#EFC74F]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0F8E95]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-[10%] w-12 h-12 rounded-full border-4 border-[#EFC74F]/20 animate-pulse"></div>
      <div
        className="absolute bottom-32 left-[15%] w-8 h-8 rounded-lg bg-[#0F8E95]/20 animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div className="absolute top-[40%] right-[5%] w-6 h-6 rotate-45 bg-purple-500/10"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#EFC74F] to-amber-600 flex items-center justify-center shadow-md">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <Link href="/web" className="flex items-center">
              <img src="/logo_sopy.png" alt="Logo" className="h-20 w-40" />
            </Link>
          </div>
        </div>

        <div className="p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100 relative">
          {/* Decorativo esquina superior */}
          <div className="absolute -top-3 -right-3 w-16 h-16">
            <div className="absolute top-0 right-0 w-16 h-16 rounded-br-xl bg-[#0F8E95]/10" />
            <div className="absolute top-0 right-0 w-8 h-8 rounded-br-xl bg-[#0F8E95]/20" />
            <div className="absolute top-0 right-0 w-4 h-4 rounded-br-xl bg-[#0F8E95]/30" />
          </div>

          <div className="text-center relative">
            <h1 className="text-3xl font-black var(--font-nunito) text-[#0F8E95]">
              Iniciar sesión
            </h1>
            <p className="mt-2 text-sm text-gray-600 var(--font-nunito)">
              Accede a tu cuenta para gestionar tus documentos tributarios
            </p>
          </div>

          <LoginForm />

          <div className="pt-5 text-center border-t border-gray-100">
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-[#0F8E95] hover:text-teal-600 var(--font-nunito) font-medium transition-colors"
            >
              ← Volver a inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
