import React from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => (
  <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className ?? ""}`} role="alert">
    <span className="block sm:inline font-semibold">{message}</span>
  </div>
);
