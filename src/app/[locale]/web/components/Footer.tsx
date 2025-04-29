"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Camion from "@/packages/images/camion-footer.svg";

const LegalLinks = () => {
  const links = [
    { _slug: "privacy", _title: "Política de Privacidad" },
    { _slug: "terms", _title: "Términos y Condiciones" },
  ];

  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <Link
          key={link._slug}
          href={`/legal/${link._slug}`}
          className="text-sm font-medium text-gray-500 hover:text-[#FFB800] transition-colors duration-200 var(--font-nunito)"
        >
          {link._title}
        </Link>
      ))}
    </div>
  );
};

export const Footer = () => (
  <footer className="relative mt-12">
    {/* Decorador superior */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1E4063] via-[#7d9fd3] to-transparent"></div>

    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFB800]/10 p-2 rounded-lg">
              <Image
                alt=""
                className="text-[#1E4063]"
                height={50}
                src={Camion}
                width={50}
              />
            </div>
            <h3 className="text-2xl text-[#1E4063] font-black var(--font-nunito)">
              Shipiando Envios
            </h3>
          </div>
          <p className="text-sm text-gray-500 var(--font-nunito)">
            Los envíos más rapidos de todo Buenos Aires.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-lg font-bold var(--font-nunito) text-gray-800">
            Enlaces rápidos
          </h4>
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="group flex items-center text-sm var(--font-nunito) text-gray-600 hover:text-[#FFB800] transition-colors duration-200"
            >
              <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-[#FFB800] mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Inicio
            </Link>
            <Link
              href="/contact"
              className="group flex items-center text-sm var(--font-nunito) text-gray-600 hover:text-[#FFB800] transition-colors duration-200"
            >
              <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-[#FFB800] mr-0 group-hover:mr-2 transition-all duration-300"></span>
              Contacto
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-lg font-bold var(--font-nunito) text-gray-800">
            Contacto
          </h4>
          <div className="flex flex-col space-y-3">
            <a
              href="mailto:info@sopy.com"
              className="flex items-center gap-3 group"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#7dd3c8]/10 group-hover:bg-[#7dd3c8]/20 transition-colors">
                <Mail className="h-4 w-4 text-[#1E4063]" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-[#7dd3c8] transition-colors var(--font-nunito)">
                info@shipiando.com
              </span>
            </a>
            <a
              href="tel:+56221234567"
              className="flex items-center gap-3 group"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#7dd3c8]/10 group-hover:bg-[#7dd3c8]/20 transition-colors">
                <Phone className="h-4 w-4 text-[#1E4063]" />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-[#7dd3c8] transition-colors var(--font-nunito)">
                +56 2 2123 4567
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-gray-400 var(--font-nunito) mb-4 md:mb-0">
          © {new Date().getFullYear()} Shipiando. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-6">
          <LegalLinks />
        </div>
      </div>
    </div>
  </footer>
);
