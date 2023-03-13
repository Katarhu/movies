import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { MouseEventHandler, useState } from 'react'
import { ROUTES } from '@config'

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick: MouseEventHandler = (event) => {
    setAnchorEl(event.currentTarget as HTMLElement)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      component="nav"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: { xs: 3, md: 5 }, py: { xs: 2, md: 3 } }}
    >
      <Typography display="flex" fontSize="1.5em">
        <Link href={ROUTES.HOME}>
          OMDB
          <span style={{ color: 'var(--gray-700)' }}>API</span>
        </Link>
      </Typography>
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Box>
            <MenuIcon />
          </Box>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ color: (theme) => theme.palette.primary.dark }}
        >
          <MenuItem
            onClick={handleClose}
            component={Link}
            href={ROUTES.HOME}
            sx={{ color: (theme) => theme.palette.primary.dark }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            href={ROUTES.SEARCH_TITLE}
            sx={{ color: (theme) => theme.palette.primary.dark }}
          >
            Search by title
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            href={ROUTES.SEARCH_SERIES}
            sx={{ color: (theme) => theme.palette.primary.dark }}
          >
            Search by series
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}
