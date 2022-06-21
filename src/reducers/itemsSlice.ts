import { createSlice, EntityState } from '@reduxjs/toolkit'
import { addOneItem, getAllItems, getItemsByAgency,  updateOneItem, deleteOneItem } from '../actions/itemsActions'
import { itemsAdapter } from '../adapters'
import { Item } from '../types/entities'
import { deleteOneTag } from '../actions/tagsActions'

export type ItemsState = EntityState<Item> & {
  meta: { requestStatus: string; error?: any } | null
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState({
    meta: { requestStatus: '', requestId: '' },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllItems.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.meta = action.meta
      itemsAdapter.setAll(state, action.payload.items)
    })
    builder.addCase(getAllItems.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getItemsByAgency.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getItemsByAgency.fulfilled, (state, action) => {
      state.meta = action.meta
      itemsAdapter.setAll(state, action.payload.items)
    })
    builder.addCase(getItemsByAgency.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(addOneItem.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(addOneItem.fulfilled, (state, action) => {
      state.meta = action.meta
      itemsAdapter.addOne(state, action.payload.item)
    })
    builder.addCase(addOneItem.rejected, (state, action) => {
      state.meta = action.meta
    })
    // When we delete a tag, we want items to be updated without calling API
    builder.addCase(deleteOneTag.fulfilled, (state, action) => {
      state.meta = action.meta
      const items = itemsAdapter
        .getSelectors()
        .selectAll(state)
        .map((i: Item) => ({
          ...i,
          tags: i.tags.filter((tagId) => tagId !== action.payload.id),
        }))
      itemsAdapter.setAll(state, items)
    })

    builder.addCase(updateOneItem.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updateOneItem.fulfilled, (state, action) => {
      state.meta = action.meta
      const { id, ...changes } = action.payload.item
      itemsAdapter.updateOne(state, { id, changes })
    })
    builder.addCase(updateOneItem.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneItem.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneItem.fulfilled, (state, action) => {
      state.meta = action.meta
      itemsAdapter.removeOne(state, action.payload.id)
    })
    builder.addCase(deleteOneItem.rejected, (state, action) => {
      state.meta = action.meta
    })
  },
})
