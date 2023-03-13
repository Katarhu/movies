import { createAsyncThunk } from '@reduxjs/toolkit'
import { axios, sleep } from '@utils'
import {
  FailureSeriesResponse,
  IMovie,
  ISeriesSearch,
  ResponseType,
  SuccessfulSeriesResponse,
} from '@models'

export const fetchSeries = createAsyncThunk(
  'series/fetch',
  async ({ series, year }: ISeriesSearch, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<
        SuccessfulSeriesResponse<IMovie> | FailureSeriesResponse
      >('', {
        params: {
          s: series,
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

export const fetchPage = createAsyncThunk(
  'series/fetchPage',
  async ({ series, year, page }: ISeriesSearch, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<
        SuccessfulSeriesResponse<IMovie> | FailureSeriesResponse
      >('', {
        params: {
          s: series,
          y: year,
          page,
        },
      })

      await sleep(350)

      if (data.Response === ResponseType.FAILURE) {
        return rejectWithValue(data.Error)
      }

      return { ...data, page }
    } catch (err) {
      return rejectWithValue('Something went wrong, please try again')
    }
  }
)
