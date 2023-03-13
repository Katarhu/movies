import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { FormEventHandler } from 'react'
import { SearchBarProps } from '@/components/SearchBar/types'

const commonInputProps = {
  style: {
    color: '#fff',
    background: 'var(--blue-600)',
    borderRadius: '.25em',
  },
}

const menuItemSx = {
  color: '#000',
}

const selectSx = {
  background: 'var(--blue-600)',
  color: '#fff',
  '& .MuiSvgIcon-root': { color: '#fff' },
}

export const SearchBar = ({
  onSearch,
  queryValue,
  handleQueryChange,
  queryLabel,
  yearValue,
  handleYearChange,
  sort,
  sortFieldTypeValue,
  handleSortFieldChange,
  sortTypeValue,
  handleSortTypeChange,
}: SearchBarProps) => {
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    onSearch()
  }

  return (
    <FormControl
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'flex-start' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          variant="outlined"
          label={queryLabel}
          inputProps={commonInputProps}
          value={queryValue}
          onChange={handleQueryChange}
        />
        <TextField
          variant="outlined"
          label="Year"
          type="number"
          inputProps={{ ...commonInputProps, min: 1900, max: 2023 }}
          value={yearValue}
          onChange={handleYearChange}
        />
      </Box>

      {sort ? (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortFieldTypeValue}
              onChange={handleSortFieldChange}
              sx={selectSx}
            >
              <MenuItem sx={menuItemSx} value="Title">
                Title
              </MenuItem>
              <MenuItem sx={menuItemSx} value="Year">
                Year
              </MenuItem>
            </Select>
            <FormHelperText sx={{ fontSize: '0.75em', textAlign: 'end' }}>
              Sorting field
            </FormHelperText>
          </FormControl>

          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortTypeValue}
              onChange={handleSortTypeChange}
              sx={selectSx}
            >
              <MenuItem sx={menuItemSx} value="ASC">
                Ascending
              </MenuItem>
              <MenuItem sx={menuItemSx} value="DESC">
                Descending
              </MenuItem>
            </Select>
            <FormHelperText sx={{ fontSize: '0.75em', textAlign: 'end' }}>
              Sorting type
            </FormHelperText>
          </FormControl>
        </Box>
      ) : null}

      <Button
        type="submit"
        disabled={!queryValue}
        sx={{
          background: 'var(--blue-600)',
          textTransform: 'none',
          height: '3.258em',
          px: 4,
        }}
      >
        Search
      </Button>
    </FormControl>
  )
}

export * from './types'
