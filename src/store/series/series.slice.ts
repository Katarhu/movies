import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IChangeSeriesAction,
  IMovie,
  ISeriesInitialState,
  SortFieldType,
  SortType,
  SuccessfulSeriesResponse,
} from '@models'
import { fetchPage, fetchSeries } from '@/store/series/series.action.creators'
import { sortMovies } from '@utils'

const initialState: ISeriesInitialState = {
  movies: [],
  query: '',
  year: '',
  error: null,
  isLoading: false,
  pagesCount: null,
  currentPage: null,
  hashedPages: null,
  sortField: 'Title',
  sortType: 'ASC',
}

export const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    clearSeriesError: (state) => {
      state.error = null
    },
    changePage: (state, action: PayloadAction<IChangeSeriesAction>) => {
      state.movies = sortMovies(
        action.payload.movies,
        state.sortField,
        state.sortType
      )
      state.currentPage = action.payload.page
    },
    changeSearchParams: (state, action: PayloadAction<{ query: string, year: string }>) => {
      state.query = action.payload.query
      state.year = action.payload.year
    },

    changeSortingField: (state, action: PayloadAction<SortFieldType>) => {
      state.sortField = action.payload
      state.movies = sortMovies(state.movies, action.payload, state.sortType)
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload
      state.movies = sortMovies(state.movies, state.sortField, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending.type, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchSeries.fulfilled.type,
        (state, action: PayloadAction<SuccessfulSeriesResponse<IMovie>>) => {
          state.isLoading = false
          state.movies = sortMovies(
            action.payload.Search,
            state.sortField,
            state.sortType
          )
          state.currentPage = 1
          state.pagesCount = Math.ceil(
            (Number(action.payload.totalResults) || 10) / 10
          )
          state.hashedPages = { 1: action.payload.Search }
        }
      )
      .addCase(
        fetchSeries.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
      .addCase(fetchPage.pending.type, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchPage.fulfilled.type,
        (
          state,
          action: PayloadAction<
            SuccessfulSeriesResponse<IMovie> & { page: number }
          >
        ) => {
          state.isLoading = false
          state.movies = sortMovies(
            action.payload.Search,
            state.sortField,
            state.sortType
          )
          state.currentPage = action.payload.page
          state.hashedPages = {
            ...state.hashedPages,
            [action.payload.page]: action.payload.Search,
          }
        }
      )
      .addCase(
        fetchPage.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  },
})

export default seriesSlice.reducer
export const {
  clearSeriesError,
  changePage,
  changeSortType,
  changeSortingField,
  changeSearchParams,
} = seriesSlice.actions

