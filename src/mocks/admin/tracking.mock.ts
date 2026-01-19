// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.

import { PackageStatus } from '@/contracts/package'

export const deliveryStatusColors = {
    [PackageStatus.AWAITING_CHECKIN]: "bg-orange-500",
    [PackageStatus.IN_TRANSIT]: "bg-blue-500",
    [PackageStatus.DELIVERED]: "bg-green-500",
    default: "bg-gray-500"
}
