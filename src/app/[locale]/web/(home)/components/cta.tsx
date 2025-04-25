"use client";

import { Button } from "@/packages/design-system/components/ui/button";
import { MoveRight, FileSpreadsheet } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const CTA = () => {
  const t = useTranslations("web");

  return (
    <div className="w-full py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFB800]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7dd3c8]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-[10%] w-12 h-12 rounded-full border-4 border-[#FFB800]/20 animate-pulse"></div>
      <div
        className="absolute bottom-32 left-[15%] w-8 h-8 rounded-lg bg-[#7dd3c8]/20 animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div className="absolute top-[40%] right-[5%] w-6 h-6 rotate-45 bg-purple-500/10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#2a9d8f] to-[#2a9d8f] backdrop-blur-sm shadow-xl border border-[#7dd3c8]/30">
          <div className="relative p-8 md:p-12 lg:p-16">
            {/* Círculos decorativos dentro del CTA */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/5 -mb-32 -ml-32"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative">
              <div className="flex flex-col max-w-xl text-center lg:text-left">
                <span className="inline-block px-4 py-1 rounded-full bg-[#FFB800]/20 text-[#FFB800] text-sm font-bold var(--font-nunito) mb-4 backdrop-blur-sm self-center lg:self-start shadow-sm">
                  Transforma tu Práctica Contable Hoy
                </span>
                <h3 className="font-black text-3xl md:text-4xl lg:text-5xl var(--font-nunito) text-white mb-4 drop-shadow-sm">
                  {t("home.cta.title")}
                </h3>
                <p className="text-white text-lg var(--font-nunito) max-w-2xl font-medium drop-shadow-sm">
                  Únete a cientos de contadores visionarios que ya han
                  modernizado sus procesos de gestión tributaria. SOPY ofrece
                  las herramientas, el apoyo y la eficiencia que necesitas para
                  destacar en la prestación de servicios fiscales a tus
                  clientes. Comienza en minutos.
                </p>

                <div className="flex flex-row gap-4 mt-8 self-center lg:self-start">
                  <Button
                    className="bg-[#FFB800] hover:bg-amber-500 text-black px-6 py-6 rounded-xl font-bold var(--font-nunito) shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                    asChild
                  >
                    <Link href={`/contact`}>
                      Comenzar ahora <MoveRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    className="bg-white hover:bg-gray-100 text-[#2a9d8f] border border-white px-6 py-6 rounded-xl font-bold var(--font-nunito) shadow-md transition-all duration-300 text-base"
                    asChild
                  >
                    <Link href={`/web/services`}>Más información</Link>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center lg:max-w-sm">
                <div className="bg-white rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#FFB800] to-amber-600 flex items-center justify-center shadow-md">
                      <FileSpreadsheet className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black var(--font-nunito) text-gray-800">
                        SOPY
                      </h4>
                      <p className="text-sm text-gray-600 var(--font-nunito)">
                        Simplificando la gestión tributaria
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-[#f8f9fa] p-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-[#FFB800] flex items-center justify-center">
                        <span className="text-white font-bold var(--font-nunito)">
                          1
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium var(--font-nunito)">
                        Integraciones con SII
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#f8f9fa] p-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-[#FFB800] flex items-center justify-center">
                        <span className="text-white font-bold var(--font-nunito)">
                          2
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium var(--font-nunito)">
                        Automatización de procesos
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#f8f9fa] p-3 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-[#FFB800] flex items-center justify-center">
                        <span className="text-white font-bold var(--font-nunito)">
                          3
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium var(--font-nunito)">
                        Soporte especializado 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
