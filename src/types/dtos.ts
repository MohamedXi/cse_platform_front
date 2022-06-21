import { Item, ItemType, Tag, TimeStampable, Person, Role, Rental } from './entities'

export type ItemDto = TimeStampable & {
  id: string
  name: string
  description: string
  itemType: string
  rentPrice: number
  depositAmount: number
  agency: string
  images: string[]
  tags: string[]
  rentals?: string[]
  endDateAvailable: Date | null
  createdAt: Date
}
export type updatedItemDto =  {
  id: string
  name: string
  description: string
  itemType: string
  rentPrice: number
  depositAmount: number
  agency: string
  images: string[]
  tags: string[]
  endDateAvailable: Date | null
}

export type ItemTypeDto = TimeStampable & {
  id: string
  name: string
}

export type PersonDto = TimeStampable & {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  agency: string
  phoneNumber: string
  roles: Array<Role>
}

export type RentalDto = TimeStampable & {
  id: string
  startDate: Date
  dueDate: Date
  endDate: Date | null
  user: string
  item: string
  depositPaid?: number | null
  // optional in any case -- null while not given once
  // refer to PostRental export below for post cases
  giveBy?: string | null
  restitutionBy?: string | null
}

export type AgencyDto = TimeStampable & {
  id: string
  name: string
}

export type TagDto = TimeStampable & {
  id: string
  name: string
}

export type PostTag = Omit<Tag, 'id' | keyof TimeStampable>
export type PostItem = Omit<Item, 'id' | 'rentals'  | keyof TimeStampable> 
export type UpdatedItem = Omit<Item,| 'rentals'  | keyof TimeStampable>
export type PostItemType = Omit<ItemType, 'id' | 'rentals' | keyof TimeStampable>
export type WithId = { id: string }
export type PostPersonRoles = Pick<Person, 'roles'>
export type PostPersonEmail = Pick<Person, 'email'>
export type PostPersonPhone = Pick<Person, 'phoneNumber'>
export type PostRental = Omit<Rental, 'id' | 'giveBy' | 'restitutionBy' | 'depositPaid' | keyof TimeStampable>
export type CollectedRental = Omit<Rental, |  'item' | 'user' | 'restitutionBy' | 'startDate' | 'dueDate' |'endDate'   | keyof TimeStampable>
export type RestitutedRental = Omit<Rental, |  'item' | 'user'  | 'depositPaid' |'giveBy' | 'startDate' | 'dueDate' | keyof TimeStampable>
