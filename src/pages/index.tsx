import { Box, Button, Typography } from '@mui/material'
import TitleIcon from '@mui/icons-material/Title'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import Link from 'next/link'
import { ROUTES } from '@config'

const navigationButtonSx = {
  fontSize: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: 2,
  py: 2,
  px: { xs: 2, md: 4 },
}

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: '2.1em', md: '3.5em' }, flexBasis: '50%' }}
        >
          <span style={{ color: 'var(--gray-700)' }}>AMDB API</span> Online
          streaming movie seach engine
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
            flexShrink: 2,
            flexBasis: '50%',
            gap: 4,
          }}
        >
          <Typography sx={{ color: 'var(--gray-700)' }}>
            This web application is an online streaming movie search engine with
            filters to find the best movies for you. Use our website to find
            movies.
          </Typography>
          <Typography sx={{ color: 'var(--gray-700)' }}>
            Sort and filter movies based on release year, title on series name.
            Get more information by clicking on movie you interested in.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              fontSize: '0.85em',
            }}
          >
            <Button
              component={Link}
              href={ROUTES.SEARCH_TITLE}
              sx={navigationButtonSx}
            >
              <TitleIcon />
              <span style={{ textAlign: 'center' }}>Search by Title</span>
            </Button>
            <Button
              component={Link}
              href={ROUTES.SEARCH_SERIES}
              sx={navigationButtonSx}
            >
              <SlideshowIcon />
              <span style={{ textAlign: 'center' }}>Search by Series</span>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
