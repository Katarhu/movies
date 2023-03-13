import { RootState } from '@/store'
import { createSelector } from 'reselect'

const selectFeature = (state: RootState) => state.seriesSearch

export const selectSearchMovies = createSelector(
  selectFeature,
  (state) => state.movies
)
export const selectSearchLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
)
export const selectSearchError = createSelector(
  selectFeature,
  (state) => state.error
)
export const selectSearchPage = createSelector(
  selectFeature,
  (state) => state.currentPage
)
export const selectSearchPagesCount = createSelector(
  selectFeature,
  (state) => state.pagesCount
)
export const selectSearchHashedPages = createSelector(
  selectFeature,
  (state) => state.hashedPages
)

export const selectHashedPages = createSelector(
  selectFeature,
  (state) => state.hashedPages
)

export const selectSeriesQuery = createSelector(
    selectFeature,
    (state) => state.query
)

export const selectSeriesYear = createSelector(
    selectFeature,
    (state) => state.year
)

export const selectCurrentPage = createSelector(
    selectFeature,
    (state) => state.currentPage
)