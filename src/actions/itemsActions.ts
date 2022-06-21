import { createAsyncThunk } from '@reduxjs/toolkit'
import { Item } from '../types/entities'
import { PostItem, UpdatedItem, WithId } from '../types/dtos'
import { getItems, getItemsByAgency as getByAgency, postItem, updateItem, deleteItem } from '../helpers/api/items'
import { dtosToItems, dtoToItem } from '../helpers/adapters/itemDTO'

export enum itemsActions {
  GET_ALL = 'GET_ALL_ITEMS',
  GET_BY_AGENCY = 'GET_ITEMS_BY_AGENCY',
  ADD_ONE = 'ADD_ONE_ITEM',
  UPDATE= 'UPDATE',
  DELETE= 'DELETE'
}

export const getAllItems = createAsyncThunk(itemsActions.GET_ALL, async (): Promise<{ items: Item[] }> => {
  return getItems().then((resource) => ({
    items: dtosToItems(resource.payload),
  }))
})
export const getItemsByAgency = createAsyncThunk(
  itemsActions.GET_BY_AGENCY,
  async (agencyId: string): Promise<{ items: Item[] }> => {
    return getByAgency(agencyId).then((resource) => ({
      items: dtosToItems(resource.payload),
    }))
  },
)

export const addOneItem = createAsyncThunk(
  itemsActions.ADD_ONE,
  async (item: PostItem): Promise<{ item: Item }> =>
    postItem(item).then((itemResource) => ({
      item: dtoToItem(itemResource.payload),
    })),
)

export const updateOneItem = createAsyncThunk(
  itemsActions.UPDATE,
  async (item: UpdatedItem): Promise<{ item: Item }> =>
    updateItem(item).then((itemResource) => ({
      item: dtoToItem(itemResource.payload),
    })),
)

export const deleteOneItem = createAsyncThunk(
  itemsActions.DELETE,
  async (itemWithId: WithId): Promise<{ id: string }> =>
  deleteItem(itemWithId).then(() => ({
      id: itemWithId.id,
    })),
)
