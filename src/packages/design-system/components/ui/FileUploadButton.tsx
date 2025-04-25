"use client";

import { Button } from "./button";
import { useFileUpload } from "../../hooks/useFileUpload";
import { Loader2 } from "lucide-react";

interface FileUploadButtonProps {
  onFileUploaded: (url: string, key: string) => void;
  buttonText: string;
  className?: string;
  folder?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
}

export function FileUploadButton({
  onFileUploaded,
  buttonText,
  className,
  folder = "sopy",
  variant = "outline",
  disabled = false,
}: FileUploadButtonProps) {
  const { selectAndUploadFile, isLoading } = useFileUpload({
    folder,
    onSuccess: (data) => {
      onFileUploaded(data.url, data.key);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleUpload = async () => {
    await selectAndUploadFile();
  };

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={handleUpload}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Subiendo...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
