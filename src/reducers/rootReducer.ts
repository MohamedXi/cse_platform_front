import { combineReducers } from 'redux'
import { agenciesSlice } from './agenciesSlice'
import { itemTypesSlice } from './itemTypesSlice'
import { itemsSlice } from './itemsSlice'
import { personsSlice } from './personsSlice'
import { rentalsSlice } from './rentalsSlice'
import { tagsSlice } from './tagsSlice'
import { reducer as oidcReducer } from 'redux-oidc'

export const rootReducer = combineReducers({
  agencies: agenciesSlice.reducer,
  itemTypes: itemTypesSlice.reducer,
  items: itemsSlice.reducer,
  persons: personsSlice.reducer,
  rentals: rentalsSlice.reducer,
  tags: tagsSlice.reducer,
  oidc: oidcReducer,
})
