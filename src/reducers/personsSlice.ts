import { createSlice, EntityState } from '@reduxjs/toolkit'
import { getAllPersons, updatePersonRoles, updatePersons } from '../actions/personsActions'
import { personsAdapter } from '../adapters'
import { Person } from '../types/entities'

export type PersonsState = EntityState<Person> & {
  // ids: string[];
  // entities: { [key: string]: Person };
  meta: { requestStatus: string; error?: any } | null
}

export const personsSlice = createSlice({
  name: 'persons',
  initialState: personsAdapter.getInitialState({
    meta: { requestStatus: '', requestId: '' },
  }),
  reducers: {},
  extraReducers: (builder) => {
    // TODO replace basic CRUD logic with to https://redux-toolkit.js.org/api/createEntityAdapter
    builder.addCase(getAllPersons.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(getAllPersons.fulfilled, (state, action) => {
      state.meta = action.meta
      personsAdapter.setAll(state, action.payload.persons)
    })
    builder.addCase(getAllPersons.rejected, (state, action) => {
      state.meta = action.meta
    })
    //Update Role
    builder.addCase(updatePersonRoles.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updatePersonRoles.fulfilled, (state, action) => {
      state.meta = action.meta
      const { id, ...changes } = action.payload.person
      personsAdapter.updateOne(state, { id, changes })
    })
    builder.addCase(updatePersonRoles.rejected, (state, action) => {
      state.meta = action.meta
    })
    //Update Email
    builder.addCase(updatePersons.pending, (state, action) => {
      state.meta = action.meta
    })
    builder.addCase(updatePersons.fulfilled, (state, action) => {
      state.meta = action.meta
      const { id, ...changes } = action.payload.person
      personsAdapter.updateOne(state, { id, changes })
    })
    builder.addCase(updatePersons.rejected, (state, action) => {
      state.meta = action.meta
    })
  },
})
