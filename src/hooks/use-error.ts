import { useState } from "react";

function extractMessage(err: any) {
  if (!err) return null;
  if (typeof err === 'string') return err;
  if (err?.message) return err.message;
  if (err?.response?.message) return err.response.message;
  if (Array.isArray(err?.response?.errors)) return err.response.errors.join(', ');
  if (Array.isArray(err?.response?.messages)) return err.response.messages.join(', ');
  if (err?.response?.error) return err.response.error;
  return String(err);
}

import { useCallback } from 'react'

export function useError() {
  const [error, setError] = useState<string | null>(null);
  const showError = useCallback((err: any) => setError(extractMessage(err) ?? 'Error inesperado'), []);
  const clearError = useCallback(() => setError(null), []);
  return { error, showError, clearError };
} 
