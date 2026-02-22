// Utilidad para saber si el usuario puede cancelar un paquete
import { UserInfo } from "@/store/store";
import { PackageData, PackageStatus } from "@/contracts/package";
import { isStatusTransitionAllowed } from "@/utils/statusTransition";

/**
 * Determina si el usuario autenticado puede cancelar el paquete.
 * Reglas:
 * - Debe ser el creador (user.id === package.creatorId)
 * - El estado debe ser cancelable
 * - El paquete debe seguir en la warehouse de origen (si aplica)
 */
export function canCancelPackage(user: UserInfo | null, pkg: PackageData): boolean {
  if (!user || !pkg) return false;
  if (user.id !== pkg.creatorId) return false;

  // Estados permitidos para cancelar
  const cancelableStatuses: PackageStatus[] = [
    PackageStatus.CREATED,
    PackageStatus.AWAITING_CHECKIN,
    PackageStatus.AT_ORIGIN,
    PackageStatus.IN_WAREHOUSE,
  ];
  // If the package can transition to CANCELLED via the backend's map, allow otherwise fallback to the cancelable list
  const canTransitionToCancelled = isStatusTransitionAllowed(pkg.status, PackageStatus.CANCELLED);
  if (!canTransitionToCancelled && !cancelableStatuses.includes(pkg.status)) return false;

  // Si el paquete ya salió de la warehouse de origen, no se puede cancelar
  if (pkg.currentWarehouseId && pkg.originWarehouseId && pkg.currentWarehouseId !== pkg.originWarehouseId) {
    return false;
  }

  return true;
}
