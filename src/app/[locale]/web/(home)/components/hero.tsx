"use client";

import React from "react";
import Image from "next/image";
import banner from "@/packages/images/home_banner.png";

export const Hero = () => {
  return (
    <div className="flex relative w-full max-w-[1980px] xl:h-[750px] flex-col z-10 items-center">
      <div className="flex w-full absolute z-0 xl:h-full">
        <Image
          alt=""
          className="flex w-full xl:h-full xl:object-cover"
          src={banner}
        />
        <div className="absolute w-full inset-0 bg-[#1E4063] opacity-60"></div>
      </div>
      <h1 className="flex w-[70%] z-10 items-center justify-center pt-20 text-white text-[26px] font-bold text-center mx-auto xl:text-[70px] tracking-wider xl:px-72 xl:mt-16">
        SOLUCIONES RÁPIDAS DE ENVÍO
      </h1>
      <div className="flex flex-fil z-10 mt-8 xl:mt-28 w-full items-center justify-center">
        <input
          className="bg-white text-center h-9 xl:w-[20%] xl:h-[50px] xl:text-[24px]"
          placeholder="Seguimiento de paquete"
        />
        <button className="text-white bg-[#1D3F60] h-9 px-4 xl:w-[10%] xl:h-[50px] xl:text-[24px]">
          Rastrear
        </button>
      </div>
    </div>
  );
};
