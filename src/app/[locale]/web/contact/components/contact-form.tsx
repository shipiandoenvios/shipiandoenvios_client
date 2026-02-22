"use client";
import { Button } from "@/packages/design-system/components/ui/button";
import { Input } from "@/packages/design-system/components/ui/input";
import { Label } from "@/packages/design-system/components/ui/label";
import { Textarea } from "@/packages/design-system/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/packages/design-system/components/ui/select";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const t = useTranslations("web");
  return (
    <div className="w-full py-20 lg:py-32 relative overflow-hidden bg-[#14273e]"> {/* Fondo azul oscuro */}
      <div className="container mx-auto max-w-3xl px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl var(--font-nunito) text-white">
            ¿Cómo podemos acompañarte en tu logística?
          </h2>
          <span className="block mt-4 text-gray-400 var(--font-nunito)">
            Somos tu equipo de soporte para envíos, tracking, integraciones y expansión logística.
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <form className="space-y-6">
            <div>
              <Label htmlFor="contactType" className="font-bold text-gray-700">
                Tipo de contacto
              </Label>
              <Select>
                <SelectTrigger className="mt-1 rounded-lg border-gray-200 h-11">
                  <SelectValue placeholder="Seleccioná una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="proveedor">Proveedor</SelectItem>
                  <SelectItem value="aliado">Aliado</SelectItem>
                  <SelectItem value="potencial-cliente">Potencial Cliente</SelectItem>
                  <SelectItem value="potencial-proveedor">Potencial Proveedor</SelectItem>
                  <SelectItem value="potencial-aliado">Potencial Aliado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reason" className="font-bold text-gray-700">
                Motivo
              </Label>
              <Select>
                <SelectTrigger className="mt-1 rounded-lg border-gray-200 h-11">
                  <SelectValue placeholder="Seleccioná un motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soporte-envio">Soporte de envío</SelectItem>
                  <SelectItem value="cotizacion">Cotización</SelectItem>
                  <SelectItem value="alianza">Alianza / Integración</SelectItem>
                  <SelectItem value="facturacion">Facturación</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="name"
                className="font-bold text-gray-700"
              >
                Nombre
              </Label>
              <Input
                id="name"
                placeholder="Tu nombre"
                className="rounded-lg border-gray-200"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="font-bold text-gray-700"
              >
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="rounded-lg border-gray-200"
              />
            </div>
            <div>
              <Label
                htmlFor="message"
                className="font-bold text-gray-700"
              >
                Mensaje
              </Label>
              <Textarea
                id="message"
                placeholder="¿En qué podemos ayudarte?"
                className="rounded-lg border-gray-200"
              />
            </div>
            <Button className="w-full bg-[#1D3F60] hover:bg-[#234d76] text-white font-semibold rounded-lg py-4 transition-all duration-200 shadow-md hover:shadow-lg tracking-wide">
              Enviar mensaje
            </Button>
            <div className="text-center">
              <p className="text-xs text-gray-500 var(--font-nunito)">
                Te responderemos en un máximo de 24 horas hábiles.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
