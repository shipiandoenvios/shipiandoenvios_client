"use client";

import { useTranslations } from "next-intl";
import { User, BarChart3, Clock, CheckCircle } from "lucide-react";
import Image from "next/image";

export const Features = () => {
  const t = useTranslations("web");
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="max-w-xl text-left font-black text-3xl tracking-tighter md:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
                {t("home.features.title")}
              </h2>
              {/* <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg var(--font-nunito)">
                {t("home.features.description")}
              </p> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Columna de características */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-white hover:shadow-md transition-all border-l-4 border-[#FFB800]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-[#FFB800]" />
                  <h3 className="text-xl font-black var(--font-nunito)">
                    Siempre al día con la normativa del SII
                  </h3>
                </div>
                <p className="text-muted-foreground var(--font-nunito)">
                  Actualizaciones automáticas que mantienen tu sistema
                  cumpliendo con todas las regulaciones sin preocupaciones.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 rounded-xl bg-white hover:shadow-md transition-all border-l-4 border-[#7dd3c8]">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-[#7dd3c8]" />
                  <h3 className="text-xl font-black var(--font-nunito)">
                    Gestión tributaria simplificada
                  </h3>
                </div>
                <p className="text-muted-foreground var(--font-nunito)">
                  Lo complejo hecho fácil para contadores y sus clientes.
                  Interfaz intuitiva con acceso a todas las funciones
                  necesarias.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 rounded-xl bg-white hover:shadow-md transition-all border-l-4 border-[#9747FF]">
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-[#9747FF]" />
                  <h3 className="text-xl font-black var(--font-nunito)">
                    Ahorra hasta 70% del tiempo
                  </h3>
                </div>
                <p className="text-muted-foreground var(--font-nunito)">
                  Automatiza procesos repetitivos y reduce drásticamente el
                  tiempo dedicado a tareas administrativas tributarias.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 rounded-xl bg-white hover:shadow-md transition-all border-l-4 border-[#FF9F67]">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-[#FF9F67]" />
                  <h3 className="text-xl font-black var(--font-nunito)">
                    Experiencia personalizada
                  </h3>
                </div>
                <p className="text-muted-foreground var(--font-nunito)">
                  Adaptamos el sistema a tus necesidades específicas, ofreciendo
                  funcionalidades a medida para cada tipo de negocio.
                </p>
              </div>
            </div>

            {/* Columna de imagen */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/caracteristica_4.png"
                  alt="Características SOPY"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7dd3c8]/30 to-transparent"></div>
              </div>
              {/* <div className="absolute -bottom-10 -left-10 bg-[#FFB800] rounded-xl p-4 shadow-lg">
                <p className="text-black font-black text-2xl var(--font-nunito)">
                  Integración SII
                </p>
                <p className="text-black var(--font-nunito)">
                  Compatibilidad total garantizada
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
