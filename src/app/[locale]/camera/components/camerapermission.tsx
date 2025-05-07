"use client";

import { useEffect, useState } from "react";
import CameraPermissionGuide from "./cameraguide";

export default function CameraPermissionButton() {
  const [permissionState, setPermissionState] = useState<
    "granted" | "denied" | "prompt" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        setPermissionState(result.state);

        result.onchange = () => {
          setPermissionState(result.state);

          if (result.state === "granted") {
            location.reload();
          }
        };
      } catch (err) {
        console.warn("No se pudo verificar permisos de cámara:", err);
        setPermissionState("prompt");
      }
    };

    checkPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionState("granted");
    } catch (err) {
      console.error("Error al solicitar permiso:", err);
      setError("No se pudo obtener acceso a la cámara.");
    }
  };

  if (permissionState === "granted") return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      <button
        onClick={requestCameraPermission}
        className="px-4 py-2 bg-[#1E4063] text-white rounded hover:bg-[#1E4063]"
      >
        Permitir acceso a la cámara
      </button>

      {permissionState === "denied" && (
        <>
          <p className="text-red-600">
            Permiso denegado de cámara. Por favor, revísalo en la configuración
            del navegador.
          </p>
          <CameraPermissionGuide />
        </>
      )}
    </div>
  );
}
