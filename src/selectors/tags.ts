import { RootState } from '../store'
import { tagsAdapter } from '../adapters'
import { createSelector } from '@reduxjs/toolkit'
import { requestStatuses } from '../types/actions'

const tagsState = (state: RootState) => state.tags

export const allTagsSelector = tagsAdapter.getSelectors<RootState>(tagsState).selectAll
export const allTagsEntitiesSelector = tagsAdapter.getSelectors<RootState>(tagsState).selectEntities

export const tagsMetaSelector = createSelector(tagsState, (state) => state.meta)
export const tagsLoadingSelector = createSelector(
  tagsMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.pending,
)
export const tagsAlreadyLoadedSelector = createSelector(
  tagsMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.fulfilled,
)
