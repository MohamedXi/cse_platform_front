import { RootState } from '../store'
import { itemTypesAdapter } from '../adapters'
import { createSelector } from '@reduxjs/toolkit'
import { requestStatuses } from '../types/actions'

// Global selectors
const itemTypesState = (state: RootState) => state.itemTypes
export const itemTypesMetaSelector = createSelector(itemTypesState, (state) => state.meta)
export const itemTypesLoadingSelector = createSelector(
  itemTypesMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.pending,
)
export const itemTypesAlreadyLoadedSelector = createSelector(
  itemTypesMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.fulfilled,
)

export const allItemTypesSelector = itemTypesAdapter.getSelectors<RootState>(itemTypesState).selectAll
export const allItemTypesEntitiesSelector = itemTypesAdapter.getSelectors<RootState>(itemTypesState).selectEntities
