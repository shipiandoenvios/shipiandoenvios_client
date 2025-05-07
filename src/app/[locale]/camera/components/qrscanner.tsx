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
  const qrReaderRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const isMobile = () =>
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

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

  useEffect(() => {
    const startScanner = async () => {
      if (!selectedCameraId || !qrReaderRef.current) return;

      const cameraConfig: string | MediaTrackConstraints = isMobile()
        ? { facingMode: "environment" }
        : selectedCameraId;

      try {
        if (html5QrCodeRef.current?.isScanning) {
          await html5QrCodeRef.current.stop().catch(() => {});
        }

        if (!html5QrCodeRef.current) {
          html5QrCodeRef.current = new Html5Qrcode(qrReaderRef.current.id);
        }

        await html5QrCodeRef.current.start(
          cameraConfig,
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
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, [selectedCameraId, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-700">Iniciando cámara...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#1E4063] text-white rounded hover:bg-[#1E4063]"
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
      {!isMobile() && (
        <>
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
        </>
      )}
      <div
        ref={qrReaderRef}
        id="qr-reader"
        className="w-full max-w-md border rounded"
      />
      <button
        onClick={() => router.push("/es/web")}
        className="text-[26px] bg-[#1E4063] text-white px-3 py-1 my-8 rounded-xl"
      >
        Volver al Inicio
      </button>
    </div>
  );
}
