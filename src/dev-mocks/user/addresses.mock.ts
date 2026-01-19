export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export const addresses: Address[] = [
  {
    id: "1",
    name: "Casa",
    street: "Av. Rivadavia 1234",
    city: "Buenos Aires",
    state: "CABA",
    zipCode: "1405",
    isDefault: true,
  },
  {
    id: "2",
    name: "Oficina",
    street: "Av. Corrientes 5678",
    city: "Buenos Aires",
    state: "CABA",
    zipCode: "1414",
    isDefault: false,
  },
]
