import FetchAPI from './fetch'
import { endpoints } from '../../consts/endpoints'
import { ApiResource, ItemType } from '../../types/entities'
import apiResponseToResource from '../adapters/apiResponseToResource'
import { ItemTypeDto, PostItemType, WithId } from '../../types/dtos'

export const getItemTypes = (): Promise<ApiResource<ItemType[]>> =>
  FetchAPI.get<ItemType[]>(endpoints.itemType).then(apiResponseToResource)

export const getItemType = (id: string): Promise<ApiResource<ItemType>> =>
  FetchAPI.get<ItemType>(`${endpoints.itemType}/${id}`).then(apiResponseToResource)

export const postItemType = (itemType: PostItemType): Promise<ApiResource<ItemType>> =>
  FetchAPI.post<ItemTypeDto, PostItemType>(endpoints.itemType, itemType).then(apiResponseToResource)

export const updateItemType = (itemType: PostItemType & WithId): Promise<ApiResource<ItemTypeDto>> =>
  FetchAPI.put<ItemTypeDto, PostItemType>(`${endpoints.itemType}/${itemType.id}`, itemType).then(apiResponseToResource)

export const deleteItemType = (itemType: PostItemType & WithId): Promise<void> =>
  FetchAPI.delete(`${endpoints.itemType}/${itemType.id}`)
