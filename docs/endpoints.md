# API Endpoints (client reference)

This file is a local reference copy for the frontend team. It lists the endpoints exposed by the API and should be updated when backend controllers or DTOs change.

Date: 2025-11-03

Base path: `/api` (apply client-side prefix if needed)

---

> Note: For the source of truth check `../../shipiando_api/docs/endpoints.md` in the root repo.
>
> Keep in sync: when the API changes, update this file and add an entry in `shipiandoenvios_client/docs/changes/` describing the impact on the client.

## warehouse
- POST /api/warehouse — CreateWarehouseDto
- GET  /api/warehouse — PaginationQueryDto
- GET  /api/warehouse/:id — (id)
- PATCH /api/warehouse/:id — UpdateWarehouseDto
- DELETE /api/warehouse/:id

## vehicle
- POST /api/vehicle — CreateVehicleDto
- GET  /api/vehicle — PaginationQueryDto
- GET  /api/vehicle/:id
- PATCH /api/vehicle/:id — UpdateVehicleDto
- DELETE /api/vehicle/:id

## user
- POST /api/user — CreateUserDto
- GET  /api/user — PaginationQueryDto
- GET  /api/user/:id
- PATCH /api/user/:id — UpdateUserDto
- DELETE /api/user/:id

## tracking-event
- POST /api/tracking-event — CreateTrackingEventDto
- GET  /api/tracking-event — PaginationQueryDto
- GET  /api/tracking-event/:id
- PATCH /api/tracking-event/:id — UpdateTrackingEventDto
- DELETE /api/tracking-event/:id

## shipment
- POST /api/shipment — CreateShipmentDto
- GET  /api/shipment — PaginationQueryDto
- GET  /api/shipment/:id
- PATCH /api/shipment/:id — UpdateShipmentDto
- DELETE /api/shipment/:id
- PATCH /api/shipment/:id/packages/bulk-update — BulkUpdateShipmentPackagesDto

## role
- POST /api/role — CreateRoleDto
- GET  /api/role — PaginationQueryDto
- GET  /api/role/:id
- PATCH /api/role/:id — UpdateRoleDto
- DELETE /api/role/:id

## product
- POST /api/product — CreateProductDto
- GET  /api/product — PaginationQueryDto
- GET  /api/product/:id
- PATCH /api/product/:id — UpdateProductDto
- DELETE /api/product/:id

## product-category
- POST /api/product-category — CreateProductCategoryDto
- GET  /api/product-category — PaginationQueryDto
- GET  /api/product-category/:id
- PATCH /api/product-category/:id — UpdateProductCategoryDto
- DELETE /api/product-category/:id


## package
- POST /api/package — CreatePackageDto
- GET  /api/package — PaginationQueryDto
- GET  /api/package/tracking/:trackingCode — (trackingCode, optional query viewerType)
- GET  /api/package/:id — (id)
- GET  /api/package/:id/context — (id, optional query viewerType)
  
	Example request (POST /api/package):
	```json
	{
		"orderId": "ORD-001",
		"trackingCode": "PKG-001",
		"weightKg": 2.5,
		"heightCm": 10,
		"lengthCm": 20,
		"widthCm": 15,
		"originId": "addr-1",
		"destinationId": "addr-2",
		"status": "CREATED"
	}
	```

	Example response (POST /api/package):
	```json
	{
		"id": "pkg-id",
		"trackingCode": "PKG-001",
		"status": "CREATED",
		"weightKg": 2.5,
		"createdAt": "2025-11-01T10:00:00.000Z"
	}
	```

	Example request (PATCH /api/package/:id/scan):
	```json
	{
		"status": "IN_TRANSIT",
		"latitude": -34.6037,
		"longitude": -58.3816,
		"currentWarehouseId": "war-1",
		"viewerType": "WAREHOUSE"
	}
	```

	Example response (PATCH /api/package/:id/scan):
	```json
	{
		"id": "pkg-id",
		"status": "IN_TRANSIT",
		"lastScanAt": "2025-11-05T12:00:00.000Z"
	}
	```
  
	Example response (GET /api/package/:id/context):
	```json
	{
		"package": {
			"id": "pkg-id",
			"trackingCode": "PKG-123",
			"status": "IN_TRANSIT",
			"lastStatusAt": "2025-10-30T12:34:56Z",
			"origin": { "id": "addr-1", "city": "Buenos Aires", "country": "AR" },
			"destination": { "id": "addr-2", "city": "Palermo", "country": "AR" }
		},
		"shipment": {
			"id": "ship-1",
			"status": "IN_TRANSIT",
			"currentWarehouse": { "id": "war-1", "name": "Depósito Central" },
			"events": [
				{ "code": "EVT-001", "type": "IN_TRANSIT", "location": "Depósito Central", "eventAt": "2025-10-30T12:00:00Z" }
			]
		}
	}
	```
- PATCH /api/package/:id — UpdatePackageDto
	- Use to update package status, including cancellation (`status: 'CANCELLED'`).
	- Only the creator can cancel if the package has not left the origin warehouse.
	- Requires authentication and valid roles (ADMIN, WAREHOUSE, CARRIER, STORE; for cancellation, only the creator and under business conditions).
- PATCH /api/package/:id/scan — ScanPackageDto (+ viewerType) (body: status?, latitude?, longitude?, currentWarehouseId?, viewerType?)
- DELETE /api/package/:id

## order
- POST /api/order — CreateOrderDto
- GET  /api/order — PaginationQueryDto
- GET  /api/order/:id
- PATCH /api/order/:id — UpdateOrderDto
- DELETE /api/order/:id

## invoice
- POST /api/invoice — CreateInvoiceDto
- GET  /api/invoice — PaginationQueryDto
- GET  /api/invoice/:id
- PATCH /api/invoice/:id — UpdateInvoiceDto
- DELETE /api/invoice/:id

## inventory
- POST /api/inventory — CreateInventoryDto
- GET  /api/inventory — PaginationQueryDto
- GET  /api/inventory/:id
- PATCH /api/inventory/:id — UpdateInventoryDto
- DELETE /api/inventory/:id

## client-user
- POST /api/client-user — CreateClientUserDto
- GET  /api/client-user/by-client/:clientId — PaginationQueryDto
- GET  /api/client-user/by-user/:userId — PaginationQueryDto
- PATCH /api/client-user/:id — UpdateClientUserDto
- DELETE /api/client-user/:id

## client
- POST /api/client — CreateClientDto
- GET  /api/client — PaginationQueryDto
- GET  /api/client/:id
- PATCH /api/client/:id — UpdateClientDto
- DELETE /api/client/:id

## carrier
- POST /api/carrier — CreateCarrierDto
- GET  /api/carrier — PaginationQueryDto
- GET  /api/carrier/:id
- PATCH /api/carrier/:id — UpdateCarrierDto
- DELETE /api/carrier/:id

## address
- POST /api/address — CreateAddressDto
- GET  /api/address — PaginationQueryDto
- GET  /api/address/:id
- PATCH /api/address/:id — UpdateAddressDto
- DELETE /api/address/:id

---

Notes:
- The DTOs listed correspond to those referenced in each controller. For specific fields consult `shipiando_api/src/modules/<module>/dto`.
- Some endpoints accept query parameters (e.g. `viewerType` on package). Check controllers for details.
- Keep this file in sync with the backend: prefer `shipiando_api/docs/endpoints.md` as the source of truth and update this file when the frontend requires local adaptations.
