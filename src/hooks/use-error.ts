import { useState } from "react";

export function useError() {
  const [error, setError] = useState<string | null>(null);
  const showError = (msg: string) => setError(msg);
  const clearError = () => setError(null);
  return { error, showError, clearError };
}
