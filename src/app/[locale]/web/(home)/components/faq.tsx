"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/packages/design-system/components/ui";
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
    <div className="w-full py-10 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-bold py-2 text-3xl md:text-4xl lg:text-5xl text-[#1E4063] inline-block bg-clip-text">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto var(--font-nunito)">
            Obtén respuestas rápidas a tus preguntas más urgentes sobre nuestra
            plataforma de envíos.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 relative">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-[#1E4063] flex items-center justify-center shadow-md">
                    <HelpCircle className=" h-8 w-8 text-white" />
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
                    className="gap-2 bg-[#1E4063] text-white px-6 py-6 rounded-xl font-bold var(--font-nunito) shadow-md transition-all duration-300"
                    asChild
                  >
                    <Link href="/web/contact">
                      <PhoneCall className="h-5 w-5" /> Contactar ahora
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
                    className="px-6 py-4 text-white font-bold hover:no-underline rounded-t-xl text-left bg-[#1E4063]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{item.id}</span>
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
