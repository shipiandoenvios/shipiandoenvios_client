"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/packages/design-system/components/ui/button";
import { MoveRight, FileSpreadsheet, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  const t = useTranslations("web");
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-12 md:py-20">
      {/* Fondo con formas decorativas */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#FFB800]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#7dd3c8]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Columna de texto */}
          <div className="flex flex-col gap-6 z-10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#FFB800]/10 text-[#FFB800] px-3 py-1.5 rounded-full text-sm font-bold">
                <Clock className="h-4 w-4" />
                <span>Ahorra hasta 70% del tiempo</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight var(--font-nunito) leading-tight">
              <span className="bg-gradient-to-r from-[#FFB800] via-[#9747FF] to-[#7dd3c8] inline-block text-transparent bg-clip-text">
                Reduce hasta 70% del tiempo en trámites tributarios
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 var(--font-nunito) max-w-lg">
              Gestión tributaria simplificada: lo complejo hecho fácil para
              contadores y sus clientes. Siempre al día con la normativa del
              SII.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button
                className="bg-[#FFB800] hover:bg-[#FFE01B] text-black var(--font-nunito) font-black h-12 px-6 text-base"
                asChild
              >
                <Link href={`/es/web/services`}>
                  Ver nuestros servicios
                  <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                className="bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-800 var(--font-nunito) font-bold h-12 px-6 text-base"
                asChild
              >
                <Link href={`/es/auth/sign-up`}>Comenzar gratis</Link>
              </Button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <p className="text-sm text-gray-500 font-medium var(--font-nunito)">
                Beneficios que obtendrás:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#7dd3c8]" />
                  <span className="text-sm var(--font-nunito)">
                    Integración con SII
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#7dd3c8]" />
                  <span className="text-sm var(--font-nunito)">
                    Soporte técnico 24/7
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#7dd3c8]" />
                  <span className="text-sm var(--font-nunito)">
                    Actualizaciones automáticas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#7dd3c8]" />
                  <span className="text-sm var(--font-nunito)">
                    Panel personalizado
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="relative z-10">
            <div className="relative rounded-2xl bg-[#7dd3c8] overflow-hidden shadow-xl h-[450px]">
              <Image
                src="/hero.png"
                alt="SOPY - Software Tributario"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7dd3c8]/40 to-transparent"></div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <FileSpreadsheet className="h-10 w-10 text-[#FFB800]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight var(--font-nunito) text-[#FFB800]">
                      SOPY
                    </h3>
                    <p className="text-sm text-gray-700 var(--font-nunito)">
                      Simplifica la gestión tributaria para contadores y sus
                      clientes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-[#FFB800] rounded-xl px-4 py-3 shadow-lg transform rotate-2">
              <p className="text-black font-black text-xl var(--font-nunito)">
                +5,000
              </p>
              <p className="text-black text-sm var(--font-nunito)">
                Declaraciones procesadas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
