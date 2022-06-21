import { User as OidcUser, Profile } from 'oidc-client'
import { Roles } from '../consts/roles'
import { rentalsStatuses } from '../helpers/statuses'
import { ItemTypeDto, PersonDto } from './dtos'

export type ApiResponse<T> = {
  '@context': string
  '@id': string
  '@type': string
}

export type ApiCollectionResponse<T> = ApiResponse<T> & {
  'hydra:member'?: T & any[]
  'hydra:search'?: {}
  'hydra:totalItems'?: number
}

export type ApiSingleResponse<T> = ApiResponse<T> & T

export type ApiResource<T> = {
  meta: {}
  payload: T
}

export type TimeStampable = {
  createdAt: Date
  updatedAt: Date
}

export type Item = TimeStampable & {
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

export type CompoundedItem = Omit<Item, 'tags' | 'itemType'> & {
  tags: Tag[]
  itemType: ItemType
}

export type ItemType = TimeStampable & {
  id: string
  name: string,
  items?:  string[]
}

export type Person = TimeStampable & {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  agency: string
  phoneNumber: string
  roles: Array<Role>
}

export type Rental = TimeStampable & {
  id: string
  startDate: Date
  dueDate: Date
  endDate: Date | null
  user: string
  item: string
  depositPaid: number | null
  giveBy: string | null
  restitutionBy: string | null
  comment?:string
}

export type CompoundedRental = Omit<Rental, 'user' | 'giveBy' | 'restitutionBy' | 'item'> & {
  user: Person
  giveBy: Person | null
  restitutionBy: Person | null
  item: CompoundedItem
  status: rentalsStatuses
}

export type Agency = TimeStampable & {
  id: string
  name: string
}

export type Tag = TimeStampable & {
  id: string
  name: string
}

export type Role = Roles.admin | Roles.collaborator | Roles.storekeeper

export type User = OidcUser & { profile: Profile & { roles: Role[] } }
