import { PackageStatus } from "@/contracts/package";

export const ALLOWED_STATUS_TRANSITIONS: Record<PackageStatus, PackageStatus[]> = {
  [PackageStatus.CREATED]: [PackageStatus.AWAITING_CHECKIN, PackageStatus.CANCELLED],
  [PackageStatus.AWAITING_CHECKIN]: [PackageStatus.AT_ORIGIN, PackageStatus.IN_WAREHOUSE, PackageStatus.CANCELLED],
  [PackageStatus.AT_ORIGIN]: [PackageStatus.IN_WAREHOUSE, PackageStatus.IN_TRANSIT, PackageStatus.CANCELLED],
  [PackageStatus.IN_WAREHOUSE]: [PackageStatus.IN_TRANSIT, PackageStatus.OUT_FOR_DELIVERY, PackageStatus.CANCELLED],
  [PackageStatus.IN_TRANSIT]: [PackageStatus.OUT_FOR_DELIVERY, PackageStatus.DELIVERED, PackageStatus.EXCEPTION],
  [PackageStatus.OUT_FOR_DELIVERY]: [PackageStatus.DELIVERED, PackageStatus.RETURNED, PackageStatus.EXCEPTION],
  [PackageStatus.CANCELLED]: [],
  [PackageStatus.DELIVERED]: [],
  [PackageStatus.RETURNED]: [],
  [PackageStatus.EXCEPTION]: [PackageStatus.IN_TRANSIT, PackageStatus.RETURNED],
};

export function isStatusTransitionAllowed(from: PackageStatus, to: PackageStatus): boolean {
  return ALLOWED_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}
