import { createAsyncThunk } from '@reduxjs/toolkit'
import { axios, sleep } from '@utils'
import {
  FailureTitleResponse,
  IMovie,
  ITitleSearch, ResponseType,
  SuccessfullTitleResponse,
} from '@models'

export const fetchMovie = createAsyncThunk(
  'title/fetch',
  async ({ title = '', year = '' }: ITitleSearch, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<
        SuccessfullTitleResponse<IMovie> | FailureTitleResponse
      >('', {
        params: {
          t: title,
          y: year,
        },
      })

      await sleep(350)

      if (data.Response === ResponseType.FAILURE) {
        return rejectWithValue(data.Error)
      }

      return data
    } catch (err) {
      return rejectWithValue('Something went wrong, please try again')
    }
  }
)
