"use client";

import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";

export default function QRScanner() {
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const readerId = "qr-reader";
  const router = useRouter();

  // Obtener cámaras disponibles al montar
  useEffect(() => {
    const getCameras = async () => {
      try {
        setIsLoading(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());

        const devices = await Html5Qrcode.getCameras();
        if (devices.length) {
          setCameras(devices);
          setSelectedCameraId(devices[0].id);
        } else {
          setError("No se encontraron cámaras disponibles");
        }
      } catch (err) {
        console.error("Error al obtener cámaras:", err);
        setError("No se pudo acceder a la cámara.");
      } finally {
        setIsLoading(false);
      }
    };

    getCameras();
  }, []);

  // Iniciar escáner o cambiar cámara
  useEffect(() => {
    const startScanner = async () => {
      if (!selectedCameraId) return;

      try {
        // Detener escáner si ya existe
        if (html5QrCodeRef.current?.isScanning) {
          await html5QrCodeRef.current.stop().catch(() => {});
        }

        // Crear una sola instancia si no existe
        if (!html5QrCodeRef.current) {
          html5QrCodeRef.current = new Html5Qrcode(readerId);
        }

        await html5QrCodeRef.current.start(
          selectedCameraId,
          {
            fps: 10,
            qrbox: { width: 270, height: 270 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            console.log("QR leído:", decodedText);
            router.push("/es/web");
          },
          () => {}
        );
      } catch (err) {
        console.error("Error al iniciar escáner:", err);
        setError("Error al iniciar el escáner. Intenta nuevamente.");
      }
    };

    startScanner();

    return () => {
      // Parar escáner sin destruir instancia
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, [selectedCameraId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700">Iniciando cámara...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-24">
      <h1 className="text-[26px] bg-[#1E4063] text-white px-3 py-1 mb-8 rounded-xl">
        Escanee el QR del paquete
      </h1>
      <label className="mb-2 font-semibold">Selecciona una cámara:</label>
      <select
        className="mb-4 p-2 rounded border"
        onChange={(e) => setSelectedCameraId(e.target.value)}
        value={selectedCameraId || ""}
      >
        {cameras.map((cam) => (
          <option key={cam.id} value={cam.id}>
            {cam.label || `Cámara ${cam.id}`}
          </option>
        ))}
      </select>
      <div id={readerId} className="w-full max-w-md border rounded" />
      <button
        onClick={() => router.push("/es/web")}
        className="text-[26px] bg-[#1E4063] text-white px-3 py-1 my-8 rounded-xl"
      >
        Volver al Inicio
      </button>
    </div>
  );
}
