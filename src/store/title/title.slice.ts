import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMovie } from '@/store/title/title.action.creators'
import { IMovie } from '@models'
import { ITitleSearchState } from '@/models/titleSearch'

const initialState: ITitleSearchState = {
  movie: null,
  isLoading: false,
  error: null,
}

export const titleSearchSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    clearTitleError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending.type, (state) => {
        state.movie = null;
        state.isLoading = true
      })
      .addCase(
        fetchMovie.fulfilled.type,
        (state, action: PayloadAction<IMovie>) => {
          state.isLoading = false
          state.movie = action.payload
        }
      )
      .addCase(fetchMovie.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false
        state.movie = null;
        state.error = action.payload
      })
  },
})

export default titleSearchSlice.reducer;
export const { clearTitleError } = titleSearchSlice.actions;