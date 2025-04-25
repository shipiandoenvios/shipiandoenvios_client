import { useState } from "react";

interface FileUploadResponse {
  url: string;
  key: string;
}

interface UseFileUploadOptions {
  folder?: string;
  onSuccess?: (data: FileUploadResponse) => void;
  onError?: (error: Error) => void;
  allowedTypes?: string[]; // Tipos de archivos permitidos
}

// Lista de tipos MIME aceptados y sus extensiones
const ACCEPTED_FILE_TYPES = {
  "application/pdf": ".pdf",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "text/csv": ".csv",
  "application/csv": ".csv",
};

/**
 * Hook personalizado para subir archivos (PDF, Excel, CSV) al endpoint
 */
export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const {
    folder = "sopy",
    onSuccess,
    onError,
    allowedTypes = Object.keys(ACCEPTED_FILE_TYPES), // Por defecto, acepta todos los tipos
  } = options;

  const uploadFile = async (file: File): Promise<FileUploadResponse | null> => {
    if (!file) return null;

    // Verificar que el archivo sea de un tipo permitido
    const isValidType = allowedTypes.some((type) => file.type === type);

    if (!isValidType) {
      // Crear descripción de tipos aceptados
      const acceptedExtensions = allowedTypes
        .map(
          (type) =>
            ACCEPTED_FILE_TYPES[type as keyof typeof ACCEPTED_FILE_TYPES]
        )
        .join(", ");

      const error = new Error(
        `Tipo de archivo no válido. Formatos aceptados: ${acceptedExtensions}`
      );
      setError(error);
      onError?.(error);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      // Endpoint para subir archivos
      const response = await fetch(
        "https://upload-images.api.appwiseinnovations.com/document/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error al subir el archivo: ${response.statusText}`);
      }

      const data: FileUploadResponse = await response.json();
      setFileUrl(data.url);
      onSuccess?.(data);
      return data;
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Error desconocido al subir el archivo");
      setError(error);
      onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Función para subir archivo desde un evento de input
   */
  const uploadFromInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      return uploadFile(file);
    }
    return null;
  };

  /**
   * Función para seleccionar y subir un archivo
   */
  const selectAndUploadFile = () => {
    return new Promise<FileUploadResponse | null>((resolve) => {
      // Crear un input de tipo file temporal
      const input = document.createElement("input");
      input.type = "file";

      // Construir el string accept basado en los tipos permitidos
      const acceptValues = allowedTypes
        .map((type) => {
          const ext =
            ACCEPTED_FILE_TYPES[type as keyof typeof ACCEPTED_FILE_TYPES];
          return ext || type;
        })
        .join(",");

      input.accept = acceptValues;

      input.onchange = async (e) => {
        const fileInput = e.target as HTMLInputElement;
        if (!fileInput.files || fileInput.files.length === 0) {
          // El usuario canceló la selección
          setIsLoading(false);
          resolve(null);
          return;
        }

        const result = await uploadFromInput(
          e as unknown as React.ChangeEvent<HTMLInputElement>
        );
        resolve(result);
      };

      // Detectar cuando el diálogo se cierra
      window.addEventListener(
        "focus",
        function focusHandler() {
          // Usar setTimeout para permitir que el evento onchange se dispare primero
          setTimeout(() => {
            // Si el input no tiene archivos, el usuario canceló
            if (!input.files || input.files.length === 0) {
              setIsLoading(false);
              resolve(null);
            }
            // Eliminar el event listener para evitar llamadas múltiples
            window.removeEventListener("focus", focusHandler);
          }, 300);
        },
        { once: true }
      );

      // Simular click para abrir el selector de archivos
      input.click();
    });
  };

  return {
    uploadFile,
    uploadFromInput,
    selectAndUploadFile,
    isLoading,
    error,
    fileUrl,
  };
}
