import { IMovie } from '@/models/movie'

export type SortFieldType = 'Title' | 'Year'

export type SortType = 'ASC' | 'DESC'

type HashedResults = {
  [Key in number]: IMovie[]
}

export interface ISeriesInitialState {
  movies: IMovie[]
  query: string
  year: string
  error: string | null
  isLoading: boolean
  hashedPages: HashedResults | null
  currentPage: number | null
  pagesCount: number | null
  sortField: SortFieldType
  sortType: SortType
}

export interface IChangeSeriesAction {
  page: number
  movies: IMovie[]
}
