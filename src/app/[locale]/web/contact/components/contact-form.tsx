"use client";

import { Button } from "@/packages/design-system/components/ui/button";
import { Calendar } from "@/packages/design-system/components/ui/calendar";
import { Input } from "@/packages/design-system/components/ui/input";
import { Label } from "@/packages/design-system/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/packages/design-system/components/ui/popover";
import { cn } from "@/packages/design-system/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  MoveRight,
  FileSpreadsheet,
  MailIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const ContactForm = () => {
  const t = useTranslations("web");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  const items = [
    {
      id: 1,
      title: t("contact.hero.benefits.item1.title"),
      description: t("contact.hero.benefits.item1.description"),
      color: "from-amber-400 to-amber-600",
    },
    {
      id: 2,
      title: t("contact.hero.benefits.item2.title"),
      description: t("contact.hero.benefits.item2.description"),
      color: "from-teal-400 to-teal-600",
    },
    {
      id: 3,
      title: t("contact.hero.benefits.item3.title"),
      description: t("contact.hero.benefits.item3.description"),
      color: "from-purple-400 to-purple-600",
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

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="text-center mb-16">
          {/* <span className="inline-block px-4 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-sm font-medium var(--font-nunito) mb-4">
            Contacto
          </span> */}
          <div className="relative inline-block">
            <h2 className="font-black text-3xl md:text-4xl lg:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-[#9747FF] to-[#7dd3c8] inline-block text-transparent bg-clip-text">
              Hablemos sobre tu <br className="sm:hidden" />
              Práctica Contable
            </h2>
            <span className="hidden md:block absolute top-0 md:-top-8 right-10 md:right-16 px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-xs md:text-sm font-medium var(--font-nunito) rotate-[6deg] animate-pulse shadow-sm">
              ¡Contáctanos!
            </span>
          </div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto var(--font-nunito)">
            Contacta con nuestro equipo para discutir cómo SOPY puede ayudar a
            simplificar la gestión tributaria para tus clientes y hacer crecer
            tu práctica.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-xl border border-[#e0e0e0] p-6 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB800]/10 to-[#FFB800]/30 blur-md"></div>

                {items.map((benefit) => (
                  <div
                    className={cn(
                      "flex flex-row items-start gap-4 py-4 border-b border-gray-100 last:border-0 transition-all duration-300",
                      hoveredBenefit === benefit.id
                        ? "bg-gray-50/50 -mx-6 px-6"
                        : ""
                    )}
                    key={benefit.id}
                    onMouseEnter={() => setHoveredBenefit(benefit.id)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br",
                        benefit.color
                      )}
                    >
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="var(--font-nunito) font-bold text-gray-800 text-lg">
                        {benefit.title}
                      </p>
                      <p className="text-gray-600 var(--font-nunito)">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 bg-gradient-to-r from-[#FFB800]/5 to-transparent p-6 rounded-xl backdrop-blur-sm border border-[#FFB800]/10">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#FFB800] to-amber-600 flex items-center justify-center shadow-md">
                <FileSpreadsheet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-[#9747FF] to-[#7dd3c8] inline-block text-transparent bg-clip-text">
                  SOPY
                </h3>
                <p className="text-gray-600 var(--font-nunito)">
                  Simplificando la gestión tributaria para contadores y sus
                  clientes
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-white border border-[#e0e0e0] p-8 shadow-lg transform transition-all hover:shadow-xl relative">
              {/* Decorativo esquina superior */}
              <div className="absolute -top-3 -right-3 w-16 h-16">
                <div className="absolute top-0 right-0 w-16 h-16 rounded-br-xl bg-[#7dd3c8]/10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 rounded-br-xl bg-[#7dd3c8]/20"></div>
                <div className="absolute top-0 right-0 w-4 h-4 rounded-br-xl bg-[#7dd3c8]/30"></div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#7dd3c8] to-teal-600 flex items-center justify-center">
                  <MailIcon className="h-6 w-6 text-white" />
                </div>
                <h5 className="text-xl font-black var(--font-nunito) text-gray-800">
                  {t("contact.hero.form.title")}
                </h5>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="picture"
                  className="var(--font-nunito) font-bold text-gray-700"
                >
                  {t("contact.hero.form.date")}
                </Label>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal var(--font-nunito) rounded-lg border-gray-200 hover:bg-[#7dd3c8]/5 hover:border-[#7dd3c8]/30",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#7dd3c8]" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>{t("contact.hero.form.date")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="firstname"
                  className="var(--font-nunito) font-bold text-gray-700"
                >
                  {t("contact.hero.form.firstName")}
                </Label>
                <Input
                  id="firstname"
                  type="text"
                  className="var(--font-nunito) rounded-lg border-gray-200 focus:border-[#7dd3c8] focus:ring-[#7dd3c8] hover:border-gray-300 transition-colors"
                  placeholder="Ingrese su nombre"
                />
              </div>

              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="lastname"
                  className="var(--font-nunito) font-bold text-gray-700"
                >
                  {t("contact.hero.form.lastName")}
                </Label>
                <Input
                  id="lastname"
                  type="text"
                  className="var(--font-nunito) rounded-lg border-gray-200 focus:border-[#7dd3c8] focus:ring-[#7dd3c8] hover:border-gray-300 transition-colors"
                  placeholder="Ingrese su apellido"
                />
              </div>

              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="picture"
                  className="var(--font-nunito) font-bold text-gray-700"
                >
                  {t("contact.hero.form.resume")}
                </Label>
                <div className="relative">
                  <Input
                    id="picture"
                    type="file"
                    className="var(--font-nunito) rounded-lg border-gray-200 focus:border-[#7dd3c8] focus:ring-[#7dd3c8] hover:border-gray-300 transition-colors"
                  />
                </div>
              </div>

              <Button className="w-full gap-4 bg-gradient-to-r from-[#FFB800] to-amber-500 hover:from-amber-500 hover:to-[#FFB800] text-white var(--font-nunito) font-bold rounded-lg mt-2 py-6 shadow-md hover:shadow-lg transition-all duration-300">
                {t("contact.hero.form.cta")} <MoveRight className="h-5 w-5" />
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500 var(--font-nunito)">
                  Te responderemos en un máximo de 24 horas hábiles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
