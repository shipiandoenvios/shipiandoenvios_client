"use client";

import { useEffect, useState } from "react";

type BrowserType = "Brave" | "Opera" | "Firefox" | "Safari" | "Chrome" | "Desconocido";

interface BraveNavigator extends Navigator {
  brave?: {
    isBrave: boolean;
  };
}

export default function CameraPermissionGuide() {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [browser, setBrowser] = useState<BrowserType | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        if (result.state === "denied") {
          setPermissionDenied(true);
        }
      } catch (err) {
        console.warn("No se pudo verificar permisos de cámara:", err);
      }
    };

    const detectBrowser = () => {
      const ua = navigator.userAgent;
      const nav = navigator as BraveNavigator;

      if (/Brave/.test(ua) || nav.brave?.isBrave) {
        return setBrowser("Brave");
      }
      if (/OPR\//.test(ua) || ua.includes("Opera")) return setBrowser("Opera");
      if (/Firefox\//.test(ua)) return setBrowser("Firefox");
      if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return setBrowser("Safari");
      if (/Chrome\//.test(ua)) return setBrowser("Chrome");

      return setBrowser("Desconocido");
    };

    checkPermission();
    detectBrowser();
  }, []);

  const renderInstructions = () => {
    switch (browser) {
      case "Brave":
        return (
          <>
            <h2 className="font-semibold">Brave Browser</h2>
            <ol className="list-decimal list-inside">
              <li>
                Hacé clic en el ícono de 🦁 (Escudo de Brave) en la barra de
                direcciones.
              </li>
              <li>
                Desactivá los escudos para este sitio (puede decir &quot;Escudo
                activado&quot;).
              </li>
              <li>
                Hacé clic en el candado 🔒 junto a la barra de direcciones.
              </li>
              <li>
                Entrá en <strong>&quot;Configuración de sitio&quot;</strong>.
              </li>
              <li>
                Buscá la sección de <strong>&quot;Cámara&quot;</strong> y
                seleccioná <strong>&quot;Permitir&quot;</strong>.
              </li>
              <li>Recargá la página.</li>
            </ol>
          </>
        );
      case "Chrome":
        return (
          <>
            <h2 className="font-semibold">Google Chrome</h2>
            <ol className="list-decimal list-inside">
              <li>
                Hacé clic en el candado 🔒 junto a la barra de direcciones.
              </li>
              <li>
                Seleccioná <strong>&quot;Configuración de sitio&quot;</strong>.
              </li>
              <li>
                Buscá la opción <strong>&quot;Cámara&quot;</strong> y cambiá a{" "}
                <strong>&quot;Permitir&quot;</strong>.
              </li>
              <li>Recargá la página.</li>
            </ol>
          </>
        );
      case "Firefox":
        return (
          <>
            <h2 className="font-semibold">Mozilla Firefox</h2>
            <ol className="list-decimal list-inside">
              <li>
                Hacé clic en el ícono de la cámara 📷 o el candado 🔒 en la
                barra de direcciones.
              </li>
              <li>
                Seleccioná <strong>&quot;Permitir&quot;</strong> para la cámara.
              </li>
              <li>Recargá la página.</li>
            </ol>
          </>
        );
      case "Safari":
        return (
          <>
            <h2 className="font-semibold">Safari</h2>
            <ol className="list-decimal list-inside">
              <li>
                En iPhone/iPad:{" "}
                <strong>Ajustes &gt; Safari &gt; Cámara &gt; Permitir</strong>.
              </li>
              <li>
                En Mac:{" "}
                <strong>
                  Safari &gt; Configuración &gt; Sitios web &gt; Cámara &gt;
                  Permitir
                </strong>
                .
              </li>
              <li>Recargá la página.</li>
            </ol>
          </>
        );
      case "Opera":
        return (
          <>
            <h2 className="font-semibold">Opera GX</h2>
            <ol className="list-decimal list-inside">
              <li>Hacé clic en el candado 🔒 en la barra de direcciones.</li>
              <li>
                Seleccioná <strong>&quot;Configuración de sitio&quot;</strong>.
              </li>
              <li>
                Buscá <strong>&quot;Cámara&quot;</strong> y cambiá a{" "}
                <strong>&quot;Permitir&quot;</strong>.
              </li>
              <li>
                También podés escribir{" "}
                <code>opera://settings/content/camera</code> en la barra de
                direcciones.
              </li>
              <li>Recargá la página.</li>
            </ol>
          </>
        );
      default:
        return (
          <p>
            No se pudo detectar el navegador. Por favor revisá los permisos de
            cámara desde la configuración del navegador.
          </p>
        );
    }
  };

  if (!permissionDenied) return null;

  return (
    <div className="bg-[#1E4063] border-l-4 border-[#060e16] text-white p-4 rounded-md max-w-xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">Permiso de cámara denegado</h2>
      <p className="mb-4">
        Para usar la cámara, habilitá el permiso desde la configuración del
        navegador.
      </p>
      {renderInstructions()}
    </div>
  );
}
