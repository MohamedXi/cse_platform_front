import { createSlice, EntityState } from '@reduxjs/toolkit'
import { Rental } from '../types/entities'
import { getAllRentals, getOnGoingRentalsByAgency, addRental, updateRental, deleteOneRental } from '../actions/rentalsActions'
import { rentalsAdapter } from '../adapters'

export type RentalsState = EntityState<Rental> & {
  meta: { requestStatus: string; error?: any } | null
}

export const rentalsSlice = createSlice({
  name: 'rentals',
  initialState: rentalsAdapter.getInitialState({
    meta: { requestStatus: '', requestId: '' },
  }),
  reducers: {},
  extraReducers: (builder) => {
    // TODO replace basic CRUD logic with to https://redux-toolkit.js.org/api/createEntityAdapter
    builder.addCase(getAllRentals.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getAllRentals.fulfilled, (state, action) => {
      state.meta = action.meta
      rentalsAdapter.setAll(state, action.payload.rentals)
    })
    builder.addCase(getAllRentals.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getOnGoingRentalsByAgency.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getOnGoingRentalsByAgency.fulfilled, (state, action) => {
      state.meta = action.meta
      rentalsAdapter.setAll(state, action.payload.rentals)
    })
    builder.addCase(getOnGoingRentalsByAgency.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(addRental.fulfilled, (state, action) => {
      state.meta = action.meta
      rentalsAdapter.addOne(state, action.payload.rental)
    })
    builder.addCase(addRental.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(addRental.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updateRental.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updateRental.fulfilled, (state, action) => {
      state.meta = action.meta
      const { id, ...changes } = action.payload.rental
      rentalsAdapter.updateOne(state, { id, changes })
    })
    builder.addCase(updateRental.rejected, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneRental.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(deleteOneRental.fulfilled, (state, action) => {
      state.meta = action.meta
      rentalsAdapter.removeOne(state, action.payload.id)
    })
    builder.addCase(deleteOneRental.rejected, (state, action) => {
      state.meta = action.meta
    })
  },
})
