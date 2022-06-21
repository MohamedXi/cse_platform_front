import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'
import { itemsAdapter } from '../adapters'
import { requestStatuses } from '../types/actions'
import { sortByName } from '../helpers/sort'
import { isFuture } from 'date-fns'
import { allTagsEntitiesSelector } from './tags'
import { allItemTypesEntitiesSelector } from './itemTypes'
import { CompoundedItem, Item, ItemType, Tag } from '../types/entities'

// Global selectors
const itemsState = (state: RootState) => state.items
const itemsMetaSelector = createSelector(itemsState, (state) => state.meta)
export const itemsLoadingSelector = createSelector(
  itemsMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.pending,
)

export const allItemsSelector = itemsAdapter.getSelectors<RootState>(itemsState).selectAll
export const allItemsEntitiesSelector = itemsAdapter.getSelectors<RootState>(itemsState).selectEntities

// Compound selectors
export const allCompoundedItemsEntitiesSelector = createSelector(
  allItemsEntitiesSelector,
  allTagsEntitiesSelector,
  allItemTypesEntitiesSelector,
  (items, tags, types) => {
    let compounded: { [id: string]: CompoundedItem } = {}
    Object.entries(items).forEach(([key, item]) => {
      if (item) {
        compounded[key] = {
          ...item,
          tags: item!.tags.map((tId) => tags[tId]) as Tag[],
          itemType: types[item.itemType] as ItemType,
        }
      }
    })
    return compounded
  },
)

// By Agency
export const itemsByAgencySelector = (agencyId: string | undefined) =>
  createSelector(allItemsSelector, (items) => items.filter((i) => i.agency === agencyId))
export const getSortedRentableItemsByAgency = (agencyId: string | undefined) =>
  createSelector(itemsByAgencySelector(agencyId), (items) =>
    items.filter((i) => !i.endDateAvailable || isFuture(i.endDateAvailable)).sort(sortByName),
  )

export const getAllItemsByAgency = (agencyId: string | undefined) =>
  createSelector(itemsByAgencySelector(agencyId), (items) => items.sort(sortByName))

//By agence
export const allCompoundedItemsByAgencySelector = createSelector(
  allItemsSelector,
  allTagsEntitiesSelector,
  allItemTypesEntitiesSelector,
  (items, tags, types) => {
    return items.map(
      (item: Item): CompoundedItem => ({
        ...item,
        tags: item!.tags.map((tId) => tags[tId]) as Tag[],
        itemType: types[item.itemType] as ItemType,
      }),
    )
  },
)
