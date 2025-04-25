import React from "react";

export function WelcomeView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] right-[5%] w-[30%] h-[30%] bg-[#EFC74F]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[5%] w-[30%] h-[30%] bg-[#0F8E95]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-[10%] w-[20%] h-[20%] bg-[#0F8E95]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#EFC74F] mb-4">
            SOPY
          </h1>
          <h2 className="text-xl md:text-3xl text-[#0F8E95] font-semibold">
            Software de Gestión Tributaria
          </h2>
          <p className="mt-4 text-gray-900 max-w-2xl mx-auto">
            Bienvenido a su plataforma integral para la gestión tributaria y
            contable. Simplifique sus procesos y mantenga todo bajo control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Gestión Fiscal",
              description:
                "Administre declaraciones y obligaciones fiscales con facilidad.",
              icon: "📊",
            },
            {
              title: "Recursos Humanos",
              description:
                "Gestione empleados, nóminas y contratos en un solo lugar.",
              icon: "👥",
            },
            {
              title: "Reportes",
              description:
                "Obtenga informes detallados y análisis para mejor toma de decisiones.",
              icon: "📈",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#EFC74F]">
                {feature.title}
              </h3>
              <p className="text-gray-900">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFC74F]/10 to-[#0F8E95]/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />

          <h3 className="text-2xl font-semibold mb-4 text-[#EFC74F] relative z-10">
            ¿No encuentra lo que busca?
          </h3>
          <p className="text-gray-900 mb-6 max-w-3xl relative z-10">
            Si no visualiza alguna sección específica, es posible que no tenga
            permisos suficientes. Contacte con su administrador para solicitar
            acceso a las funcionalidades que necesita.
          </p>

          <div className="flex flex-wrap gap-4 relative z-10">
            <a
              href="#"
              className="px-6 py-3 bg-[#EFC74F] text-white font-medium rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              Ver documentación
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:border-gray-300 transition-colors duration-300"
            >
              Contactar soporte
            </a>
          </div>
        </div> */}
      </div>

      {/* Elementos decorativos estáticos */}
      <div className="hidden md:block">
        <div className="absolute top-20 right-[10%] w-12 h-12 rounded-full border-4 border-[#EFC74F]/20" />
        <div className="absolute bottom-32 left-[15%] w-8 h-8 rounded-lg bg-[#0F8E95]/20" />
        <div className="absolute top-[40%] right-[5%] w-6 h-6 rotate-45 bg-[#0F8E95]/10" />
      </div>
    </div>
  );
}
