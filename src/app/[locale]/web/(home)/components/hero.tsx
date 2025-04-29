"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import banner from "@/packages/images/home_banner.png";

export const Hero = () => {
  const t = useTranslations("web");
  return (
    <div className="flex relative flex-col z-10 items-center mb-5">
      <div className="flex w-full absolute z-0">
        <Image alt="" className="flex w-full" src={banner} />
        <div className="absolute inset-0 bg-[#1E4063] opacity-60"></div>
      </div>
      <h1 className="flex w-[70%] z-10 items pt-20 text-white text-[30px] font-bold text-center">
        SOLUCIONES RÁPIDAS DE ENVÍO
      </h1>
      <div className="flex flex-fil z-10 mt-8">
        <input
          className="bg-white text-center h-9"
          placeholder="Seguimiento de paquete"
        />
        <button className="text-white bg-[#1D3F60] px-4">Rastrear</button>
      </div>
    </div>
  );
};
