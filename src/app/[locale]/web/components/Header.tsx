"use client";

import { Button } from "@/packages/design-system/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/packages/design-system/lib/utils";

export default function Header() {
  const t = useTranslations("web");
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productoOpen, setProductoOpen] = useState(false);
  const productoRef = useRef<HTMLDivElement>(null);

  // Detectar scroll para cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Cerrar el menú de producto al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        productoRef.current &&
        !productoRef.current.contains(event.target as Node)
      ) {
        setProductoOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
        isOpen && "bg-white shadow-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/web" className="flex items-center">
            <img src="/logo_sopy.png" alt="Logo" className="h-20 w-40" />
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/web"
              className="text-gray-700 hover:text-[#FFB800] font-medium text-sm transition-colors duration-200"
            >
              Inicio
            </Link>

            {/* Menú desplegable Producto */}
            <div className="relative" ref={productoRef}>
              <button
                onClick={() => setProductoOpen(!productoOpen)}
                className="flex items-center text-gray-700 hover:text-[#FFB800] font-medium text-sm transition-colors duration-200"
              >
                Producto
                <ChevronDown
                  className={cn(
                    "ml-2 h-4 w-4 transition-transform duration-200",
                    productoOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {productoOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden z-50">
                  <div className="p-4">
                    <h3 className="font-bold var(--font-nunito) text-gray-800 mb-1">
                      Producto
                    </h3>
                    <p className="text-sm text-gray-500 var(--font-nunito) mb-3">
                      Gestionar registros tributarios nunca fue tan fácil
                    </p>

                    <div className="space-y-2">
                      <Link
                        href="/web/pricing"
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FFB800] rounded-md transition-colors"
                        onClick={() => setProductoOpen(false)}
                      >
                        Precios
                        <ChevronDown className="h-4 w-4 transform -rotate-90" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/web/contact"
              className="text-gray-700 hover:text-[#FFB800] font-medium text-sm transition-colors duration-200"
            >
              Contacto
            </Link>
          </nav>

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              asChild
              className="font-medium hover:text-[#FFB800] hover:bg-transparent"
            >
              <Link href="/auth/login">{t("header.signIn")}</Link>
            </Button>
            {/* <Button
              className="bg-[#FFB800] hover:bg-[#FFE01B] text-black font-bold transition-all duration-200 shadow-sm hover:shadow"
              asChild
            >
              <Link href="/auth/register">{t("header.signUp")}</Link>
            </Button> */}
          </div>

          {/* Botón de menú móvil */}
          <button
            onClick={() => setOpen(!isOpen)}
            className="flex md:hidden items-center justify-center rounded-full w-10 h-10 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "fixed inset-x-0 z-50 overflow-hidden bg-white transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "top-20 opacity-100" : "-top-[500px] opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col space-y-4">
            {/* Inicio */}
            <Link
              href="/web"
              className="flex items-center justify-between py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#FFB800] transition-all"
              onClick={() => setOpen(false)}
            >
              <span className="font-medium">Inicio</span>
              <ChevronDown size={16} className="transform -rotate-90" />
            </Link>

            {/* Producto dropdown en móvil */}
            <div className="flex flex-col">
              <button
                className="flex items-center justify-between py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#FFB800] transition-all"
                onClick={() => {
                  // Lógica para desplegar submenú en móvil
                }}
              >
                <span className="font-medium">Producto</span>
                <ChevronDown size={16} className="transform rotate-0" />
              </button>

              <div className="ml-4 pl-4 border-l border-gray-200 mt-2">
                <Link
                  href="/web/pricing"
                  className="flex items-center justify-between py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#FFB800] transition-all"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-medium">Precios</span>
                  <ChevronDown size={16} className="transform -rotate-90" />
                </Link>
              </div>
            </div>

            {/* Contacto */}
            <Link
              href="/web/contact"
              className="flex items-center justify-between py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#FFB800] transition-all"
              onClick={() => setOpen(false)}
            >
              <span className="font-medium">Contacto</span>
              <ChevronDown size={16} className="transform -rotate-90" />
            </Link>

            <div className="border-t my-2"></div>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="outline"
                asChild
                className="w-full justify-center font-medium"
              >
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  {t("header.signIn")}
                </Link>
              </Button>
              {/* <Button
                className="w-full justify-center bg-[#FFB800] hover:bg-[#FFE01B] text-black font-bold"
                asChild
              >
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  {t("header.signUp")}
                </Link>
              </Button> */}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
