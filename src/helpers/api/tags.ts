import { ApiResource, Tag } from '../../types/entities'
import FetchAPI from './fetch'
import { endpoints } from '../../consts/endpoints'
import { PostTag, TagDto, WithId } from '../../types/dtos'
import apiResponseToResource from '../adapters/apiResponseToResource'

export const getTags = (): Promise<ApiResource<TagDto[]>> =>
  FetchAPI.get<Tag[]>(endpoints.tags).then(apiResponseToResource)

export const postTag = (tag: PostTag): Promise<ApiResource<TagDto>> =>
  FetchAPI.post<TagDto, PostTag>(endpoints.tags, tag).then(apiResponseToResource)

export const updateTag = (tag: PostTag & WithId): Promise<ApiResource<TagDto>> =>
  FetchAPI.put<TagDto, PostTag>(`${endpoints.tags}/${tag.id}`, tag).then(apiResponseToResource)

export const deleteTag = (tag: PostTag & WithId): Promise<void> => FetchAPI.delete(`${endpoints.tags}/${tag.id}`)
