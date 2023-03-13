import { combineReducers, configureStore } from '@reduxjs/toolkit'
import titleSearchReducer from './title/title.slice'
import seriesSearchReducer from './series/series.slice'

const rootReducer = combineReducers({
  titleSearch: titleSearchReducer,
  seriesSearch: seriesSearchReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
