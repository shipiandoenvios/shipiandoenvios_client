"use client";

import { BarChart4, FileText, Clock, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/packages/design-system/lib/utils";

export const Stats = () => {
  const t = useTranslations("web");

  const stats = [
    {
      title: t("home.stats.items.item1.title"),
      icon: FileText,
      color: "from-[#FFB800] to-amber-500",
      bgColor: "bg-[#FFB800]/10",
    },
    {
      title: t("home.stats.items.item2.title"),
      icon: Users,
      color: "from-[#7dd3c8] to-[#2a9d8f]",
      bgColor: "bg-[#7dd3c8]/10",
    },
    {
      title: t("home.stats.items.item3.title"),
      icon: Clock,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-400/10",
    },
    {
      title: t("home.stats.items.item4.title"),
      icon: BarChart4,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-400/10",
    },
  ];

  return (
    <div className="w-full py-20 lg:py-32 relative overflow-hidden">
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
        <div className="text-center mb-16">
          {/* <span className="inline-block px-4 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-sm font-medium var(--font-nunito) mb-4">
            Impacto medible
          </span> */}
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-[#9747FF] to-[#7dd3c8] inline-block text-transparent bg-clip-text">
            Resultados Reales para
            <br />
            Profesionales Contables
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto var(--font-nunito)">
            Nuestra plataforma está diseñada específicamente para ayudar a
            contadores a gestionar mejor los registros tributarios de sus
            clientes, reducir la carga administrativa y aumentar la
            satisfacción.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-md border border-gray-100 p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br opacity-5 -mr-10 -mt-10"></div>

                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div
                      className={`h-16 w-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md mb-5`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold var(--font-nunito) text-gray-800 mb-2">
                      {stat.title}
                    </h3>

                    <div
                      className={`inline-block h-1 w-10 ${stat.bgColor} rounded-full mb-4`}
                    ></div>
                  </div>

                  <div className="mt-auto pt-4 flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${stat.bgColor} mr-2`}
                    ></div>
                    <span className="text-sm text-gray-600 var(--font-nunito)">
                      {index === 0 && "+5,000 al mes"}
                      {index === 1 && "+200 contadores activos"}
                      {index === 2 && "70% menos tiempo"}
                      {index === 3 && "98% satisfacción"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
