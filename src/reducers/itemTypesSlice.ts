import { createSlice, EntityState } from '@reduxjs/toolkit'
import { ItemType } from '../types/entities'
import { addOneItemType, deleteOneItemType, getAllItemTypes, updateOneItemType } from '../actions/itemTypesActions'
import { itemTypesAdapter } from '../adapters'

export type ItemTypesState = EntityState<ItemType> & {
  meta: { requestStatus: string; error?: any } | null
}

export const itemTypesSlice = createSlice({
  name: 'itemTypes',
  initialState: itemTypesAdapter.getInitialState({
    meta: { requestStatus: '', requestId: '' },
  }),
  reducers: {},
  extraReducers: (builder) => {
    // TODO replace basic CRUD logic with to https://redux-toolkit.js.org/api/createEntityAdapter
    builder.addCase(getAllItemTypes.pending, (state, action) => {
      state.meta = action.meta
    })
     builder.addCase(getAllItemTypes.fulfilled, (state, action) => {
          state.meta = action.meta
          itemTypesAdapter.setAll(state, action.payload.itemType)
        })
    builder.addCase(getAllItemTypes.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(addOneItemType.fulfilled, (state, action) => {
      state.meta = action.meta
      itemTypesAdapter.addOne(state, action.payload.itemType)
    })
    builder.addCase(addOneItemType.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updateOneItemType.pending, (state, action) => {
      state.meta = action.meta
    })
     builder.addCase(updateOneItemType.fulfilled, (state, action) => {
          state.meta = action.meta
          const { id, ...changes } = action.payload.itemType
          itemTypesAdapter.updateOne(state, { id, changes })
        })
    builder.addCase(updateOneItemType.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneItemType.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneItemType.fulfilled, (state, action) => {
      state.meta = action.meta
      itemTypesAdapter.removeOne(state, action.payload.id)
    })
    builder.addCase(deleteOneItemType.rejected, (state, action) => {
      state.meta = action.meta
    })
  },
})
