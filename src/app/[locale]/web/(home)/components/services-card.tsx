import Image, { StaticImageData } from "next/image";
import React from "react";

type ServicesCardProps = {
  title: string;
  text: string;
  icon: StaticImageData;
};

export default function ServicesCard({ title, text, icon }: ServicesCardProps) {
  return (
    <div className="flex flex-row items-center border-gray-200 border-[1px] rounded-md shadow-2xl p-3 w-[50%] xl:w-[20%]">
      <div className="flex rounded-full p-2 bg-[#1D3F60] w-[60px] mr-2 xl:w-[100px] xl:p-4">
        <Image
          alt="paquete-nacional"
          className="w-[50px] xl:w-[85px]"
          src={icon}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-[#1D3F60] font-bold text-[20px] xl:text-[30px]">
          {title}
        </h1>
        <p className="text-[#1D3F60] text-[16px] xl:text-[22px]">{text}</p>
      </div>
    </div>
  );
}
