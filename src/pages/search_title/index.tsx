import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import { SearchBar, SnackbarAlert } from '@components'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { Movie } from '@components'
import { useAppDispatch, useAppSelector } from '@hooks'
import { fetchMovie } from '@/store/title/title.action.creators'
import {
  selectTitleError,
  selectTitleIsLoading,
  selectTitleMovie,
} from '@/store/title/title.selectors'
import { clearTitleError } from '@/store/title/title.slice'

export default function SearchByTitlePage() {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('')
  const dispatch = useAppDispatch()
  const searchedMovie = useAppSelector(selectTitleMovie)
  const error = useAppSelector(selectTitleError)
  const isLoading = useAppSelector(selectTitleIsLoading)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleQueryChange: ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement
    setQuery(target.value)
  }

  const handleYearChange: ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement
    setYear(target.value)
  }

  useEffect(() => {
    if (error) {
      setIsSnackbarOpen(true)
    }
  }, [error])

  const handleSnackbarClose = (_: unknown, reason?: string) => {
    if (reason === 'clickaway') return

    setIsSnackbarOpen(false)
    dispatch(clearTitleError())
  }

  const onSearch = () => {
    void dispatch(fetchMovie({ title: query, year }))
  }

  const movieItem = searchedMovie ? (
    <Movie {...searchedMovie} />
  ) : isLoading ? (
    <CircularProgress />
  ) : (
    <Typography>There is no movies yet</Typography>
  )

  return (
    <Box>
      <SearchBar
        onSearch={onSearch}
        queryValue={query}
        handleQueryChange={handleQueryChange}
        queryLabel="Movie title"
        yearValue={year}
        handleYearChange={handleYearChange}
      />
      <Box sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
        {movieItem}
      </Box>
      {error !== null && (
        <SnackbarAlert
          isOpen={isSnackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
        >
          {error}
        </SnackbarAlert>
      )}
    </Box>
  )
}
