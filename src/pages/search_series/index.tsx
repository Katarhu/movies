import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { Movie, SearchBar, SnackbarAlert } from '@components'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { SortFieldType, SortType } from '@models'
import { useAppDispatch, useAppSelector } from '@hooks'
import {
  selectCurrentPage,
  selectHashedPages,
  selectSearchError,
  selectSearchLoading,
  selectSearchMovies,
  selectSearchPagesCount, selectSeriesQuery, selectSeriesYear,
} from '@/store/series/seriest.selectors'
import { fetchPage, fetchSeries } from '@/store/series/series.action.creators'
import {
  changePage, changeSearchParams,
  changeSortingField,
  changeSortType,
  clearSeriesError,
} from '@/store/series/series.slice'

export default function SearchSeriesPage() {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('')
  const [sortField, setSortField] = useState<SortFieldType>('Title')
  const [sortType, setSortType] = useState<SortType>('ASC')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const dispatch = useAppDispatch()

  const movies = useAppSelector(selectSearchMovies)
  const isLoading = useAppSelector(selectSearchLoading)
  const error = useAppSelector(selectSearchError)
  const pagesCount = useAppSelector(selectSearchPagesCount)
  const hashedPages = useAppSelector(selectHashedPages)
  const seriesQuery = useAppSelector(selectSeriesQuery)
  const seriesYear = useAppSelector(selectSeriesYear)
  const currentPage = useAppSelector(selectCurrentPage);

  const handleQueryChange: ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement
    setQuery(target.value)
  }

  const handleYearChange: ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement
    setYear(target.value)
  }

  const handleSortFieldChange = (event: SelectChangeEvent<SortFieldType>) => {
    const value = event.target.value as SortFieldType
    setSortField(value)
    void dispatch(changeSortingField(value))
  }

  const handleSortTypeChange = (event: SelectChangeEvent<SortType>) => {
    const value = event.target.value as SortType
    setSortType(value)
    void dispatch(changeSortType(value))
  }

  const onSearch = () => {
    void dispatch(changeSearchParams({ query, year }));
    void dispatch(fetchSeries({ series: query, year }))
  }

  useEffect(() => {
    if (error) {
      setIsSnackbarOpen(true)
    }
  }, [error])
  const handleSnackbarClose = (_: unknown, reason?: string) => {
    if (reason === 'clickaway') return

    setIsSnackbarOpen(false)
    dispatch(clearSeriesError())
  }

  const handlePageChange = (_: unknown, page: number) => {
    const movies = hashedPages?.[page]

    if (movies) {
      return dispatch(changePage({ movies, page }))
    }

    void dispatch(fetchPage({ series: seriesQuery, year: seriesYear, page }))
  }

  const movieItems = isLoading ? (
    <Grid item xs={16} sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Grid>
  ) : movies.length ? (
    movies.map((movie) => (
      <Grid
        item
        xs={4}
        key={movie.imdbID}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Movie {...movie} />
      </Grid>
    ))
  ) : (
    <Grid item xs={16}>
      <Typography textAlign="center">There is no movies yet</Typography>
    </Grid>
  )

  const paginationDefaultPage = currentPage ?? 1;

  return (
    <Box>
      <SearchBar
        queryValue={query}
        handleQueryChange={handleQueryChange}
        queryLabel="Series name"
        yearValue={year}
        sort
        handleYearChange={handleYearChange}
        sortFieldTypeValue={sortField}
        handleSortFieldChange={handleSortFieldChange}
        sortTypeValue={sortType}
        handleSortTypeChange={handleSortTypeChange}
        onSearch={onSearch}
      />
      {pagesCount !== null ? (
        <Box pt={5}>
          <Pagination
            count={pagesCount}
            color="primary"
            page={paginationDefaultPage}
            onChange={handlePageChange}
            sx={{
              '& .MuiPagination-ul': { justifyContent: 'center' },
              '& .MuiButtonBase-root': {
                color: (theme) => theme.palette.primary.main,
              },
              '& .MuiPaginationItem-root': {
                color: (theme) => theme.palette.primary.main,
              },
              '& .Mui-selected': {
                color: (theme) => theme.palette.primary.dark,
              },
              '& .Mui-selected:hover': {
                background: 'var(--gray-xl)',
                color: (theme) => theme.palette.primary.dark,
              },
            }}
          />
        </Box>
      ) : null}
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        rowSpacing={{ xs: 2, md: 5 }}
        columnSpacing={{ xs: 2, md: 3 }}
        py={5}
      >
        {movieItems}
      </Grid>
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
