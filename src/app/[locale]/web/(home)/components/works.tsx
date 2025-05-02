"use client";

import Image from "next/image";
import send from "@/packages/images/send-icon.svg";
import transport from "@/packages/images/transport-icon.svg";
import recieve from "@/packages/images/recieve-icon.svg";

export const Works = () => {
  return (
    <div className="flex flex-col relative pt-18 z-20 items-center px-5 mb-6 xl:pt-24">
      <h1 className="text-[#1D3F60] text-[22px] font-bold text-center xl:text-[50px]">
        ¿CÓMO FUNCIONA?
      </h1>
      <div className="flex justify-between w-full max-w-4xl xl:max-w-[1600px] mt-5">
        <div className="flex flex-col w-[30%] items-center">
          <div className="flex-col bg-[#1E4063] rounded-full">
            <Image
              alt=""
              className="p-2 w-15 h-15 xl:w-[120px] xl:h-[120px]"
              src={send}
            />
          </div>
          <h2 className="text-[#1E4063] text-[20px] font-bold xl:text-[35px]">
            Envía
          </h2>
          <p className="text-[#1E4063] text-[15px] xl:text-[25px] text-center">
            Envíanos tus datos del paquete
          </p>
        </div>
        <div className="flex flex-col w-[30%] items-center">
          <div className="flex-col bg-[#1E4063] rounded-full">
            <Image
              alt=""
              className="p-2 w-15 h-15 xl:w-[120px] xl:h-[120px]"
              src={transport}
            />
          </div>
          <h2 className="text-[#1E4063] text-[20px] font-bold xl:text-[35px]">
            Transporta
          </h2>
          <p className="text-[#1E4063] text-[15px] xl:text-[25px] text-center">
            Movemos tu paquete a su destino
          </p>
        </div>
        <div className="flex flex-col w-[30%] items-center">
          <div className="flex-col bg-[#1E4063] rounded-full">
            <Image
              alt=""
              className="p-2 w-15 h-15 xl:w-[120px] xl:h-[120px]"
              src={recieve}
            />
          </div>
          <h2 className="text-[#1E4063] text-[20px] font-bold xl:text-[35px]">
            Entrega
          </h2>
          <p className="text-[#1E4063] text-[15px] xl:text-[25px] text-center">
            Recibe a tiempo en tu casa
          </p>
        </div>
      </div>
    </div>
  );
};
