import { createAsyncThunk } from '@reduxjs/toolkit'
import { dtoToItemType } from '../helpers/adapters/itemTypeDTO'
import { deleteItemType, getItemTypes, postItemType, updateItemType } from '../helpers/api/itemTypes'
import { PostItemType, WithId } from '../types/dtos'
import { ItemType } from '../types/entities'

export enum itemTypesActions {
  GET_ALL = 'GET_ALL_ITEM_TYPES',
  ADD_ONE = 'ADD_ONE_ITEM_TYPE',
  UPDATE = 'UPDATE_ITEM_TYPE',
  DELETE = 'DELETE_ITEM_TYPE',
}
export const unwrapItemType = (itemTypeResult: { itemType: ItemType }) => ({ ...itemTypeResult.itemType })

export const getAllItemTypes = createAsyncThunk(
  itemTypesActions.GET_ALL,
  async (): Promise<{ itemType: ItemType[] }> =>
    getItemTypes().then((itemTypesResource) => ({
      itemType: itemTypesResource.payload,
    })),
)

export const addOneItemType = createAsyncThunk(
  itemTypesActions.ADD_ONE,
  async (itemType: PostItemType): Promise<{ itemType: ItemType }> =>
    postItemType(itemType).then((itemTypesResource) => ({
      itemType: dtoToItemType(itemTypesResource.payload),
    })),
)

export const updateOneItemType = createAsyncThunk(
  itemTypesActions.UPDATE,
  async (itemType: PostItemType & WithId): Promise<{ itemType: ItemType }> =>
  updateItemType(itemType).then((itemTypesResource) => ({
      itemType: dtoToItemType(itemTypesResource.payload),
    })),
)

export const deleteOneItemType = createAsyncThunk(
  itemTypesActions.DELETE,
  async (itemType: PostItemType & WithId): Promise<{ id: string }> =>
    deleteItemType(itemType).then(() => ({
      id: itemType.id,
    })),
)
