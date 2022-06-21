import { createSlice, EntityState } from '@reduxjs/toolkit'
import { addOneTag, deleteOneTag, getAllTags, updateOneTag } from '../actions/tagsActions'
import { Tag } from '../types/entities'
import { tagsAdapter } from '../adapters'

export type TagsState = EntityState<Tag> & {
  meta: { requestStatus: string; error?: any } | null
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: tagsAdapter.getInitialState({
    meta: { requestStatus: '', requestId: '' },
  }),
  reducers: {},
  extraReducers: (builder) => {
    // TODO replace basic CRUD logic with to https://redux-toolkit.js.org/api/createEntityAdapter
    builder.addCase(getAllTags.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getAllTags.fulfilled, (state, action) => {
      state.meta = action.meta
      tagsAdapter.setAll(state, action.payload.tags)
    })
    builder.addCase(getAllTags.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(addOneTag.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(addOneTag.fulfilled, (state, action) => {
      state.meta = action.meta
      tagsAdapter.addOne(state, action.payload.tag)
    })
    builder.addCase(addOneTag.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updateOneTag.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updateOneTag.fulfilled, (state, action) => {
      state.meta = action.meta
      const { id, ...changes } = action.payload.tag
      tagsAdapter.updateOne(state, { id, changes })
    })
    builder.addCase(updateOneTag.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneTag.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneTag.fulfilled, (state, action) => {
      state.meta = action.meta
      tagsAdapter.removeOne(state, action.payload.id)
    })
    builder.addCase(deleteOneTag.rejected, (state, action) => {
      state.meta = action.meta
    })
  },
})
