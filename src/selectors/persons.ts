import { RootState } from '../store'
import { personsAdapter } from '../adapters'
import { createSelector } from '@reduxjs/toolkit'
import { requestStatuses } from '../types/actions'

// Types
import { Roles } from '../consts/roles'

const personState = (state: RootState) => state.persons
const personMetaSelector = createSelector(personState, (state) => state.meta)

export const allPersonsSelector = personsAdapter.getSelectors(personState).selectAll
export const allPersonsEntitiesSelector = personsAdapter.getSelectors(personState).selectEntities

// To get the persons who have only the admin role
export const personAdminWithoutStorekeeperSelector = createSelector(allPersonsSelector, (items) =>
  items.filter((i) => i?.roles.includes(Roles.admin) && !i?.roles.includes(Roles.storekeeper)),
)

// To get the persons who have the admin and storekeeper roles
export const personsAdminAndStorekeeperSelector = createSelector(allPersonsSelector, (items) =>
  items.filter((i) => i?.roles.includes(Roles.admin) || i?.roles.includes(Roles.storekeeper)),
)
export const personsStorekeeperSelector = createSelector(allPersonsSelector, (items) =>
  items.filter((i) =>  i?.roles.includes(Roles.storekeeper)),
)

export const personsLoadingSelector = createSelector(
  personMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.pending,
)
export const personsAlreadyLoadedSelector = createSelector(
  personMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.fulfilled,
)
export const personsFailedSelector = createSelector(
  personMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.rejected,
)
