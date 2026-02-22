"use client";
import { Button } from "@/packages/design-system/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/packages/internationalization";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/packages/design-system/lib/utils";
import logo from "@/packages/images/new-location-icon.svg";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("web");
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productoOpen, setProductoOpen] = useState(false);
  const productoRef = useRef<HTMLDivElement>(null);

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
        scrolled
          ? "bg-[#1D3F60]/60 backdrop-blur-sm shadow-sm"
          : "bg-transparent",
        isOpen && "bg-[#1D3F60]/60 shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 xl:mt-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/web" className="flex items-center">
            <Image src={logo} alt="Logo" className="h-[30px] w-[40px]" />
            <h1 className="text-white text-[16px] font-bold tracking-[2px] xl:text-[36px] ">
              SHIPIANDO
            </h1>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/web"
              className="text-white hover:text-[#1D3F60] font-medium text-sm transition-colors duration-200 xl:text-[22px]"
            >
              Inicio
            </Link>

            {/* Menú desplegable Producto */}
            <div className="relative" ref={productoRef}>
              <button
                onClick={() => setProductoOpen(!productoOpen)}
                className="flex items-center text-white hover:text-[#1D3F60] font-medium text-sm transition-colors duration-200 xl:text-[22px]"
              >
                Servicios
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
                      Envio de mensajería
                    </h3>
                    <p className="text-sm text-gray-500 var(--font-nunito) mb-3">
                      ¡Danos la información de tu paquete y nosotros te lo
                      enviamos!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="text-white hover:text-[#1D3F60] font-medium text-sm transition-colors duration-200 xl:text-[22px]"
            >
              Sucursales
            </Link>

            <Link
              href="/web/contact"
              className="text-white hover:text-[#1D3F60] font-medium text-sm transition-colors duration-200 xl:text-[22px]"
            >
              Contacto
            </Link>
          </nav>

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              asChild
              className="font-medium text-white hover:text-[#1D3F60] hover:bg-transparent xl:text-[18px]"
            >
              {/* Link to login */}
              <Link href="/auth/login">{t("header.signIn")}</Link>
            </Button>
            <Button
              className="bg-[#1D3F60] hover:bg-[#44697a] text-white font-bold transition-all duration-200 shadow-sm hover:shadow xl:text-[18px]"
              asChild
            >
              {/* Link to register */}
              <Link href="/auth/register">{t("header.signUp")}</Link>
            </Button>
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
                {/* <Link href="/auth/login" onClick={() => setOpen(false)}>
                  {t("header.signIn")}
                </Link> */}
              </Button>
              <Button
                className="w-full justify-center bg-[#FFB800] hover:bg-[#FFE01B] text-black font-bold"
                asChild
              >
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  {t("header.signUp")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
