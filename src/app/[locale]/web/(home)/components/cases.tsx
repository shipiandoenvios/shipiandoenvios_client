"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/packages/design-system/components/ui/carousel";
import {
  Building,
  Calculator,
  BarChart4,
  Receipt,
  Quote,
  FileSpreadsheet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/packages/design-system/lib/utils";

export const Cases = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const testimonials = [
    {
      icon: FileSpreadsheet,
      name: "FiscalPro",
      role: "Contabilidad Empresarial",
      text: "SOPY redujo nuestro tiempo de gestión tributaria en un 40%.",
      color: "from-amber-400 to-amber-600",
    },
    {
      icon: Calculator,
      name: "TaxExpert",
      role: "Consultoría Fiscal",
      text: "Gracias a SOPY pudimos automatizar el 90% de nuestras declaraciones.",
      color: "from-teal-400 to-teal-600",
    },
    {
      icon: Building,
      name: "ContaPlus",
      role: "Servicios Financieros",
      text: "La integración con el SII nos ha ahorrado incontables horas de trabajo.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: BarChart4,
      name: "FiscalEase",
      role: "Asesoría Tributaria",
      text: "SOPY transformó nuestra manera de gestionar los impuestos de clientes.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Receipt,
      name: "AuditMaster",
      role: "Auditoría Contable",
      text: "La precisión y velocidad de SOPY han revolucionado nuestros procesos.",
      color: "from-red-400 to-red-600",
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, current]);

  return (
    <div className="w-full py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFB800]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7dd3c8]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-10 relative">
            <h2 className="font-black text-3xl md:text-4xl lg:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-[#9747FF] to-[#7dd3c8] inline-block text-transparent bg-clip-text">
              <span className="relative">
                <span className="absolute -top-10 -right-4 md:-top-8 md:-right-12 px-4 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-xs md:text-sm font-medium var(--font-nunito) whitespace-nowrap animate-pulse transform rotate-[-30deg]">
                  Casos de éxito
                </span>
              </span>{" "}
              Empresas que confían en nosotros
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto var(--font-nunito)">
              Descubre cómo SOPY ha transformado la gestión tributaria de
              contadores y empresas en todo Chile.
            </p>
          </div>

          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="py-4">
                {testimonials.map((item, index) => {
                  const Icon = item.icon;
                  const isHovered = hoveredIndex === index;

                  return (
                    <CarouselItem
                      key={index}
                      className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 pl-4"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        className={cn(
                          "h-full rounded-xl p-6 transition-all duration-300 shadow-md bg-white border border-gray-100",
                          isHovered
                            ? "shadow-lg scale-[1.02] border-[#FFB800]/30"
                            : ""
                        )}
                      >
                        <div className="flex flex-col h-full">
                          <div className="mb-5 flex justify-between items-start">
                            <div
                              className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br",
                                item.color
                              )}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <Quote className="w-8 h-8 text-gray-200" />
                          </div>

                          <p className="text-gray-700 font-medium mb-5 flex-grow var(--font-nunito)">
                            {item.text}
                          </p>

                          <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-lg font-bold var(--font-nunito) text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 var(--font-nunito)">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      current === index
                        ? "bg-[#FFB800] w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                    onClick={() => {
                      api?.scrollTo(index);
                      setCurrent(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <CarouselPrevious className="left-2 md:-left-12 bg-white border border-gray-200 text-gray-700 hover:bg-[#FFB800] hover:text-white hover:border-[#FFB800]" />
              <CarouselNext className="right-2 md:-right-12 bg-white border border-gray-200 text-gray-700 hover:bg-[#FFB800] hover:text-white hover:border-[#FFB800]" />
            </Carousel>
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5">
            {testimonials.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 bg-white hover:border-[#FFB800]/30 transition-all duration-300"
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br mb-3",
                      item.color
                    )}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-bold var(--font-nunito) text-center">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
