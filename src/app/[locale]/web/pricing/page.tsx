"use client";

import { Button } from "@/packages/design-system/components/ui/button";
import {
  Check,
  Minus,
  MoveRight,
  PhoneCall,
  Zap,
  Users,
  Lock,
} from "lucide-react";
import Link from "next/link";

const Pricing = () => {
  return (
    <div className="w-full py-24 lg:py-32 relative overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-50 to-transparent opacity-50"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-yellow-50 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
            <span className="w-2 h-2 rounded-full bg-[#FFB800] mr-2"></span>
            Planes para cada necesidad
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <h2 className="max-w-2xl text-center font-black text-4xl tracking-tighter md:text-5xl lg:text-6xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
              Precios que tienen sentido para tu práctica
            </h2>
            <p className="max-w-xl mx-auto text-center text-lg text-muted-foreground leading-relaxed tracking-tight var(--font-nunito)">
              Elige el plan que se adapte a las necesidades de tu práctica
              contable
            </p>
          </div>

          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 pt-12 relative">
            {/* Plan 1 - Básico */}
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-sm border border-[#e0e0e0] overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="p-6 relative">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <Lock className="h-5 w-5 text-[#7dd3c8]" />
                  </div>
                </div>

                <p className="text-xl font-bold var(--font-nunito) text-[#FFB800]">
                  Básico
                </p>
                <p className="text-muted-foreground text-sm mt-1 var(--font-nunito)">
                  Ideal para contadores independientes
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
                    $29
                  </span>
                  <span className="text-muted-foreground text-sm var(--font-nunito)">
                    / mes
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Inicio de Sesión Único (SSO)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Minus className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm text-gray-500">
                      Asistente de IA
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Minus className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm text-gray-500">
                      Control de Versiones
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Hasta 5 miembros
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-auto border-t border-gray-100">
                <Button
                  variant="outline"
                  className="w-full gap-2 var(--font-nunito) font-medium h-10"
                  asChild
                >
                  <Link href={"/web/contact"}>
                    Pruébalo <MoveRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Plan 2 - Pro (Featured) */}
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md border-2 border-[#FFB800] overflow-hidden transition-all duration-300 hover:shadow-lg relative">
              <div className="absolute top-0 right-0 bg-[#FFB800] text-black px-3 py-1 rounded-bl-xl var(--font-nunito) font-bold text-xs">
                POPULAR
              </div>

              <div className="p-6 relative">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-yellow-50">
                    <Zap className="h-5 w-5 text-[#FFB800]" />
                  </div>
                </div>

                <p className="text-xl font-bold var(--font-nunito) text-[#FFB800]">
                  Pro
                </p>
                <p className="text-muted-foreground text-sm mt-1 var(--font-nunito)">
                  Para equipos contables en crecimiento
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
                    $79
                  </span>
                  <span className="text-muted-foreground text-sm var(--font-nunito)">
                    / mes
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Inicio de Sesión Único (SSO)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Asistente de IA
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Control de Versiones
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Hasta 25 miembros
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-auto border-t border-yellow-100">
                <Button
                  className="w-full gap-2 bg-[#FFB800] hover:bg-[#FFE01B] text-black var(--font-nunito) font-bold h-10"
                  asChild
                >
                  <Link href={"/web/contact"}>
                    Pruébalo <MoveRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Plan 3 - Empresarial */}
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-sm border border-[#e0e0e0] overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="p-6 relative">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                </div>

                <p className="text-xl font-bold var(--font-nunito) text-[#FFB800]">
                  Empresarial
                </p>
                <p className="text-muted-foreground text-sm mt-1 var(--font-nunito)">
                  Para firmas contables establecidas
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-purple-500 to-blue-600 inline-block text-transparent bg-clip-text">
                    $199
                  </span>
                  <span className="text-muted-foreground text-sm var(--font-nunito)">
                    / mes
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Inicio de Sesión Único (SSO)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Asistente de IA
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      Control de Versiones
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#7dd3c8] flex-shrink-0 mt-0.5" />
                    <span className="var(--font-nunito) text-sm">
                      100+ miembros
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-auto border-t border-gray-100">
                <Button
                  variant="outline"
                  className="w-full gap-2 var(--font-nunito) font-medium h-10"
                  asChild
                >
                  <Link href="/web/contact">
                    Contáctanos <PhoneCall className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Sección de contacto */}
          <div className="mt-16 max-w-2xl mx-auto p-5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row items-center gap-5">
            <div className="flex-shrink-0 p-2 bg-white rounded-full shadow-sm">
              <PhoneCall className="h-5 w-5 text-[#FFB800]" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg var(--font-nunito)">
                ¿Necesitas ayuda para elegir?
              </h3>
              <p className="text-gray-500 var(--font-nunito) text-sm mt-1">
                Nuestro equipo está listo para ayudarte a encontrar el plan
                perfecto para tu negocio
              </p>
            </div>
            <div className="flex-shrink-0 ml-auto">
              <Button
                variant="ghost"
                className="gap-2 var(--font-nunito) font-medium"
                asChild
              >
                <Link href="/web/contact">
                  Contáctanos <MoveRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
