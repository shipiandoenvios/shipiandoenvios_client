"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/packages/design-system/components/ui/avatar";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/packages/design-system/components/ui/carousel";
import { Star, Quote, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/packages/design-system/lib/utils";

export const Testimonials = () => {
  const t = useTranslations("web");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = [
    {
      title: t("home.testimonials.items.item1.title"),
      description: t("home.testimonials.items.item1.description"),
      image: t("home.testimonials.items.item1.author.image"),
      name: t("home.testimonials.items.item1.author.name"),
      color: "from-amber-400 to-amber-600",
      role: "Director Financiero",
    },
    {
      title: t("home.testimonials.items.item2.title"),
      description: t("home.testimonials.items.item2.description"),
      image: t("home.testimonials.items.item2.author.image"),
      name: t("home.testimonials.items.item2.author.name"),
      color: "from-teal-400 to-teal-600",
      role: "Contador Senior",
    },
    {
      title: t("home.testimonials.items.item3.title"),
      description: t("home.testimonials.items.item3.description"),
      image: t("home.testimonials.items.item3.author.image"),
      name: t("home.testimonials.items.item3.author.name"),
      color: "from-purple-400 to-purple-600",
      role: "Gerente de Impuestos",
    },
    {
      title: t("home.testimonials.items.item4.title"),
      description: t("home.testimonials.items.item4.description"),
      image: t("home.testimonials.items.item4.author.image"),
      name: t("home.testimonials.items.item4.author.name"),
      color: "from-blue-400 to-blue-600",
      role: "Asesor Tributario",
    },
  ];

  useEffect(() => {
    if (!api || isPaused) {
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
    }, 4000);

    return () => clearInterval(interval);
  }, [api, current, isPaused]);

  return (
    <div
      className="w-full py-20 lg:py-32 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
        <div className="flex flex-col gap-8">
          <div className="text-center mb-8">
            {/* <span className="inline-block px-4 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-sm font-medium var(--font-nunito) mb-4">
              Lo que dicen nuestros clientes
            </span> */}
            <h2 className="font-black text-3xl md:text-4xl lg:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-[#9747FF] to-[#7dd3c8] inline-block text-transparent bg-clip-text">
              Testimonios
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto var(--font-nunito)">
              Descubre por qué nuestros clientes confían en SOPY para sus
              necesidades tributarias
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
                {items.map((item, index) => {
                  const isHovered = hoveredIndex === index;

                  return (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3 pl-4"
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        setIsPaused(true);
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(null);
                        setIsPaused(false);
                      }}
                    >
                      <div
                        className={cn(
                          "flex flex-col h-full rounded-xl p-6 transition-all duration-300 shadow-md bg-white border border-gray-100",
                          isHovered
                            ? "shadow-lg scale-[1.02] border-[#FFB800]/30 -rotate-1"
                            : ""
                        )}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 stroke-1 text-[#FFB800] fill-[#FFB800]"
                              />
                            ))}
                          </div>
                          <Quote className="h-8 w-8 text-gray-200 rotate-180" />
                        </div>

                        <h3 className="text-lg font-bold var(--font-nunito) text-gray-900 mb-2">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 var(--font-nunito) mb-4 flex-grow">
                          {item.description}
                        </p>

                        <div className="flex items-center pt-4 border-t border-gray-100">
                          <div className="relative">
                            <Avatar className="border border-white shadow-sm h-6 w-6">
                              <AvatarImage src={item.image} alt={item.name} />
                              <AvatarFallback className="text-xs bg-gray-100">
                                {item.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={cn(
                                "absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-br border border-white",
                                item.color
                              )}
                            ></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-bold var(--font-nunito) text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 var(--font-nunito)">
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
                {items.map((_, index) => (
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

              <CarouselPrevious
                className="left-2 md:-left-12 bg-white border border-gray-200 text-gray-700 hover:bg-[#FFB800] hover:text-white hover:border-[#FFB800]"
                onClick={() => setIsPaused(true)}
              />
              <CarouselNext
                className="right-2 md:-right-12 bg-white border border-gray-200 text-gray-700 hover:bg-[#FFB800] hover:text-white hover:border-[#FFB800]"
                onClick={() => setIsPaused(true)}
              />
            </Carousel>
          </div>

          <div className="flex justify-center mt-8">
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-bold var(--font-nunito) text-[#FFB800] hover:text-amber-600 transition-colors"
            >
              Ver más testimonios
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
