"use client";

import { Link } from "@/packages/internationalization";
import Image from "next/image";
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
    if (user) {
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
      <div
        className="absolute bottom-32 left-[15%] w-8 h-8 rounded-lg bg-[#0F8E95]/20 animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <Link href="/web" className="flex items-center">
              <Image
                src="/shipiando_logo.png"
                alt="Logo"
                width={180}
                height={180}
                className="text-white mt-2"
              />
            </Link>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-[#eef1f3] via-white to-[#d5e8f3] space-y-6 rounded-xl shadow-lg border border-gray-100 relative">
          <div className="text-center relative">
            <h1 className="text-3xl font-black var(--font-nunito) text-[#1E4063]">
              Iniciar sesión
            </h1>
            <p className="mt-2 text-sm text-gray-600 var(--font-nunito)">
              Accede a tu cuenta para empezar a gestionar tus envios
            </p>
          </div>

          <LoginForm />

          <div className="flex flex-col text-center border-t border-gray-100">
            <Link
              href="/auth/register"
              className="mt-4 inline-block text-sm text-[#1E4063] hover:text-[#0798F0] var(--font-nunito) font-medium transition-colors"
            >
              ¿No tienes cuenta? Regístrate aquí
            </Link>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-[#1E4063] hover:text-[#0798F0] var(--font-nunito) font-medium transition-colors"
            >
              ← Volver a inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
