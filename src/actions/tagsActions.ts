import { createAsyncThunk } from '@reduxjs/toolkit'
import { Tag } from '../types/entities'
import { deleteTag, getTags, postTag, updateTag } from '../helpers/api/tags'
import { PostTag, WithId } from '../types/dtos'
import { dtosToTags, dtoToTag } from '../helpers/adapters/tagDTO'

export enum tagsActions {
  GET_ALL = 'GET_ALL_TAGS',
  ADD_ONE = 'ADD_ONE_TAG',
  UPDATE = 'UPDATE_TAG',
  DELETE = 'DELETE_TAG',
}

export const unwrapTag = (tagResult: { tag: Tag }) => ({ ...tagResult.tag })

export const getAllTags = createAsyncThunk(
  tagsActions.GET_ALL,
  async (): Promise<{ tags: Tag[] }> =>
    getTags().then((tagsResource) => ({
      tags: dtosToTags(tagsResource.payload),
    })),
)

export const addOneTag = createAsyncThunk(
  tagsActions.ADD_ONE,
  async (tag: PostTag): Promise<{ tag: Tag }> =>
    postTag(tag).then((tagResource) => ({
      tag: dtoToTag(tagResource.payload),
    })),
)

export const updateOneTag = createAsyncThunk(
  tagsActions.UPDATE,
  async (tag: PostTag & WithId): Promise<{ tag: Tag }> =>
    updateTag(tag).then((tagResource) => ({
      tag: dtoToTag(tagResource.payload),
    })),
)

export const deleteOneTag = createAsyncThunk(
  tagsActions.DELETE,
  async (tag: PostTag & WithId): Promise<{ id: string }> =>
    deleteTag(tag).then(() => ({
      id: tag.id,
    })),
)
