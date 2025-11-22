export interface ICreateContact {
  name: string
  email: string
  phoneNumber: string
  birthDate: Date | string
}

export interface IUpdateContact {
  name?: string
  email?: string
  phoneNumber?: string
  birthDate?: Date | string
}
