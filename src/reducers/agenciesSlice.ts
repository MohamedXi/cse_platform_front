import { createSlice, EntityState } from '@reduxjs/toolkit'
import { agenciesAdapter } from '../adapters'
import { getAllAgencies } from '../actions/agenciesActions'
import { Agency } from '../types/entities'

export type AgenciesState = EntityState<Agency> & {
  meta: { requestStatus: string; error?: any } | null
}

export const agenciesSlice = createSlice({
  name: 'agencies',
  initialState: agenciesAdapter.getInitialState({
    meta: { requestStatus: '', requestId: '' },
  }),
  reducers: {},
  extraReducers: (builder) => {
    // TODO replace basic CRUD logic with to https://redux-toolkit.js.org/api/createEntityAdapter
    builder.addCase(getAllAgencies.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getAllAgencies.fulfilled, (state, action) => {
      state.meta = action.meta
      agenciesAdapter.setAll(state, action.payload.agencies)
    })
    builder.addCase(getAllAgencies.rejected, (state, action) => {
      state.meta = action.meta
    })
  },
})
