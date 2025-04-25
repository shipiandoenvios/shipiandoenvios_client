"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/packages/design-system/components/ui/accordion";
import { Button } from "@/packages/design-system/components/ui/button";
import { PhoneCall, HelpCircle, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const FAQ = () => {
  const t = useTranslations("web");

  const items = [
    {
      id: 1,
      question: "home.faq.items.item1.question",
      answer: "home.faq.items.item1.answer",
    },
    {
      id: 2,
      question: "home.faq.items.item2.question",
      answer: "home.faq.items.item2.answer",
    },
    {
      id: 3,
      question: "home.faq.items.item3.question",
      answer: "home.faq.items.item3.answer",
    },
    {
      id: 4,
      question: "home.faq.items.item4.question",
      answer: "home.faq.items.item4.answer",
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
        <div className="text-center mb-12">
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl var(--font-nunito) bg-gradient-to-r from-[#FFB800] via-[#9747FF] to-[#7dd3c8] inline-block text-transparent bg-clip-text">
            Preguntas Frecuentes sobre SOPY
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto var(--font-nunito)">
            Obtén respuestas rápidas a tus preguntas más urgentes sobre nuestra
            plataforma de gestión tributaria. Hemos recopilado todo lo que los
            contadores necesitan saber sobre la transformación de la gestión de
            registros tributarios de sus clientes.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 relative">
              <div className="absolute -top-3 -left-3 w-16 h-16">
                <div className="absolute top-0 left-0 w-16 h-16 rounded-tl-xl bg-[#FFB800]/10"></div>
                <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-xl bg-[#FFB800]/20"></div>
                <div className="absolute top-0 left-0 w-4 h-4 rounded-tl-xl bg-[#FFB800]/30"></div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#7dd3c8] to-[#2a9d8f] flex items-center justify-center shadow-md">
                    <HelpCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black var(--font-nunito) text-gray-800">
                    ¿Necesitas más información?
                  </h3>
                </div>

                <p className="text-gray-600 var(--font-nunito)">
                  Si no encuentras respuesta a tu pregunta, nuestro equipo de
                  soporte está disponible para ayudarte en cada paso.
                  Contáctanos directamente y recibirás asistencia personalizada
                  para resolver todas tus dudas.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="gap-2 bg-gradient-to-r from-[#FFB800] to-amber-500 hover:from-amber-500 hover:to-[#FFB800] text-white px-6 py-6 rounded-xl font-bold var(--font-nunito) shadow-md transition-all duration-300"
                    asChild
                  >
                    <Link href="/contact">
                      <PhoneCall className="h-5 w-5" /> Contactar ahora
                    </Link>
                  </Button>

                  <Button
                    className="gap-2 bg-gradient-to-r from-[#7dd3c8]/10 to-[#7dd3c8]/20 hover:from-[#7dd3c8]/20 hover:to-[#7dd3c8]/30 text-[#2a9d8f] px-6 py-6 rounded-xl font-bold var(--font-nunito) shadow-sm transition-all duration-300 border border-[#7dd3c8]/20"
                    asChild
                  >
                    <Link href="/web/services">
                      <MessageCircle className="h-5 w-5" /> Ver servicios
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Accordion className="w-full">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  className="mb-4 overflow-hidden border-0 shadow-md rounded-xl"
                >
                  <AccordionTrigger
                    id={`item-${item.id}`}
                    className="px-6 py-4 text-white font-bold hover:no-underline var(--font-nunito) rounded-t-xl text-left bg-gradient-to-r from-[#7dd3c8]/80 to-[#2a9d8f]/80 hover:from-[#7dd3c8]/90 hover:to-[#2a9d8f]/90"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold var(--font-nunito)">
                          {item.id}
                        </span>
                      </div>
                      <span>{t(item.question)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    id={`item-${item.id}`}
                    className="px-6 py-4 text-gray-700 var(--font-nunito) bg-white border border-gray-100 rounded-b-xl border-t-0"
                  >
                    <p className="leading-relaxed">{t(item.answer)}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
