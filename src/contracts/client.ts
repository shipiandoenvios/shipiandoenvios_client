// Centralized contracts for Client and related DTOs
// This file should be kept in sync with backend DTOs

export interface ClientInfo {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rut?: string | null;
  giroType?: string | null;
  claveTributaria?: string | null;
}

export interface CreateClientDto {
  name: string;
  email?: string;
  phone?: string;
}

export interface ClientUser {
  clientId: string;
  userId: string;
  role: string;
}
