import { agenciesAdapter } from '../adapters'
import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'
import { requestStatuses } from '../types/actions'

const agenciesState = (state: RootState) => state.agencies
export const allAgenciesSelector = agenciesAdapter.getSelectors<RootState>(agenciesState).selectAll

export const AgencyByNameSelector = (name: string) =>
  createSelector(allAgenciesSelector, (agencies) => agencies.find((a) => a.name.toUpperCase() === name.toUpperCase()))
export const agenciesMetaSelector = createSelector(agenciesState, (state) => state.meta)
export const agenciesLoadingSelector = createSelector(
  agenciesMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.pending,
)
export const agenciesAlreadyLoadedSelector = createSelector(
  agenciesMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.fulfilled,
)
