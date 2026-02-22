import { PackageStatus } from '@/contracts/package'

export const problemPackages = [
  {
    id: "TRK-001229",
    description: "Cable USB-C",
    problem: "Destinatario ausente",
    status: PackageStatus.EXCEPTION,
    lastAttempt: "15/01 16:30",
  },
]

export const problemTypes = [
  { value: "not-delivered", label: "No fue entregado" },
  { value: "damaged", label: "Paquete dañado" },
  { value: "wrong-address", label: "Dirección incorrecta" },
  { value: "delayed", label: "Retraso en entrega" },
  { value: "other", label: "Otro problema" },
]

export const emergencyContact = {
  phone: "0800-SHIPIANDO",
  description: "Contacta con nuestro soporte 24/7",
}
