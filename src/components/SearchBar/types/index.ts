import { ChangeEventHandler } from 'react'
import { SelectChangeEvent } from '@mui/material'
import {SortFieldType, SortType} from "@models";


interface SearchBarSortProps {
  onSearch: () => void
  queryValue: string
  handleQueryChange: ChangeEventHandler
  queryLabel?: string
  yearValue: string
  handleYearChange: ChangeEventHandler
  sort: true
  sortFieldTypeValue: SortFieldType
  handleSortFieldChange: (event: SelectChangeEvent<SortFieldType>) => void
  sortTypeValue: SortType
  handleSortTypeChange: (event: SelectChangeEvent<SortType>) => void
}

interface SearchBarDefaultProps {
  onSearch: () => void
  queryValue: string
  handleQueryChange: ChangeEventHandler
  queryLabel?: string
  yearValue: string
  handleYearChange: ChangeEventHandler
  sort?: undefined
  sortFieldTypeValue?: undefined
  handleSortFieldChange?: undefined
  sortTypeValue?: undefined
  handleSortTypeChange?: undefined
}

export type SearchBarProps = SearchBarSortProps | SearchBarDefaultProps