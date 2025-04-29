"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import send from "@/packages/images/send-icon.svg";
import transport from "@/packages/images/transport-icon.svg";
import recieve from "@/packages/images/recieve-icon.svg";

export const Works = () => {
  const t = useTranslations("web");
  return (
    <div className="flex flex-col relative pt-14 z-20 items-center px-5 mb-6">
      <h1 className="text-[#1D3F60] text-[22px] font-bold text-center">
        ¿CÓMO FUNCIONA?
      </h1>
      <div className="flex justify-between w-full max-w-4xl mt-5">
        <div className="flex flex-col w-[30%] items-center">
          <div className="flex-col bg-[#1E4063] rounded-full">
            <Image alt="" className="p-2 w-15 h-15" src={send} />
          </div>
          <h2 className="text-[#1E4063] text-[20px] font-bold">Envía</h2>
          <p className="text-[#1E4063] text-[15px] text-center">
            Envíanos tus datos del paquete
          </p>
        </div>
        <div className="flex flex-col w-[30%] items-center">
          <div className="flex-col bg-[#1E4063] rounded-full">
            <Image alt="" className="p-2 w-15 h-15" src={transport} />
          </div>
          <h2 className="text-[#1E4063] text-[20px] font-bold">Transporta</h2>
          <p className="text-[#1E4063] text-[15px] text-center">
            Movemos tu paquete a su destino
          </p>
        </div>
        <div className="flex flex-col w-[30%] items-center">
          <div className="flex-col bg-[#1E4063] rounded-full">
            <Image alt="" className="p-2 w-15 h-15" src={recieve} />
          </div>
          <h2 className="text-[#1E4063] text-[20px] font-bold">Entrega</h2>
          <p className="text-[#1E4063] text-[15px] text-center">
            Recibe a tiempo en tu casa
          </p>
        </div>
      </div>
    </div>
  );
};
