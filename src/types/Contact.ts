export interface Multi {
  id: string,
  value: string
}

export interface Contact {
  name: string,
  lastName: string,
  address: string,
  city: string,
  country: string,
  emails: Multi[],
  numbers: Multi[],
}

export interface ContactWithId extends Contact {
  id: number,
}