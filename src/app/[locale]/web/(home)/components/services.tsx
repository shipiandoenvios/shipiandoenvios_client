"use client";

import { useTranslations } from "next-intl";
import ServicesCard from "./services-card";
import enviosNacionales from "@/packages/images/paquetería-nacional.svg";
import diagramaEmpresarial from "@/packages/images/diagrama-empresarial.svg";

const servicesHome = [
  {
    title: "Paquetería Nacional",
    text: "Envios por todo el país",
    icon: enviosNacionales,
  },
  {
    title: "Logística Empresarial",
    text: "Gestion de envios para empresas",
    icon: diagramaEmpresarial,
  },
];

export const Services = () => {
  const t = useTranslations("web");

  return (
    <div className="flex flex-col relative pt-7 z-20 items-center px-5 mb-6">
      <h1 className="text-[#1D3F60] text-[22px] font-bold text-center">
        NUESTROS SERVICIOS
      </h1>
      <div className="flex flex-row justify-center items-stretch gap-4 mt-5 w-full">
        {servicesHome.map((services, index) => (
          <ServicesCard
            key={index}
            title={services.title}
            text={services.text}
            icon={services.icon}
          />
        ))}
      </div>
    </div>
  );
};
