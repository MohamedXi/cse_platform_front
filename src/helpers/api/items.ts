import { ApiResource, TimeStampable } from '../../types/entities'
import FetchAPI from './fetch'
import { endpoints } from '../../consts/endpoints'
import { itemToDto,updatedItemToDto } from '../adapters/itemDTO'
import { ItemDto, PostItem, UpdatedItem ,WithId } from '../../types/dtos'
import apiResponseToResource from '../adapters/apiResponseToResource'

export const getItems = (): Promise<ApiResource<ItemDto[]>> =>
  FetchAPI.get<ItemDto[]>(endpoints.items).then(apiResponseToResource)

export const getItemsByAgency = (agencyId: string): Promise<ApiResource<ItemDto[]>> =>
  FetchAPI.get<ItemDto[]>(`${endpoints.agencies}/${agencyId}/${endpoints.items}`).then(apiResponseToResource)

export const postItem = (item: PostItem): Promise<ApiResource<ItemDto>> => {
  // Provide fake Timestampable data to Adapter but remove them before post
  const fakeTimeStampable: TimeStampable = {
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const { id, createdAt, updatedAt, ...itemToPost } = itemToDto({
    id: '',
    ...fakeTimeStampable,
    ...item,
  })
  const {images, ...itemToPostWithoutImages}= itemToPost
  return FetchAPI.post<ItemDto, Omit<PostItem,'images'>>(endpoints.items, itemToPostWithoutImages).then(apiResponseToResource)
}

export const updateItem = (item: UpdatedItem ): Promise<ApiResource<ItemDto>> =>{
    const {id,images,...itemWithoutId}=updatedItemToDto(item)
    return FetchAPI.put<ItemDto, Omit<UpdatedItem, 'id' |'images' >>(`${endpoints.items}/${id}`, itemWithoutId).then(apiResponseToResource)
}

export const deleteItem = (itemWithId: WithId): Promise<void> => FetchAPI.delete(`${endpoints.items}/${itemWithId.id}`)

