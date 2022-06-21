import { createEntityAdapter } from '@reduxjs/toolkit'
import { Agency, Item, ItemType, Person, Rental, Tag } from '../types/entities'

export const agenciesAdapter = createEntityAdapter<Agency>({
  selectId: ({ id }) => id,
})

export const itemsAdapter = createEntityAdapter<Item>({
  selectId: ({ id }) => id,
})

export const itemTypesAdapter = createEntityAdapter<ItemType>({
  selectId: ({ id }) => id,
})

export const personsAdapter = createEntityAdapter<Person>({
  selectId: ({ id }) => id,
})

export const rentalsAdapter = createEntityAdapter<Rental>({
  selectId: ({ id }) => id,
})

export const tagsAdapter = createEntityAdapter<Tag>({
  selectId: ({ id }) => id,
})
