import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material'
import { IMovie } from '@models'
import Link from 'next/link'
import DefaultPosterImage from '@assets/DefaultPosterImage.jpg'
import { ROUTES } from '@config'

const SERIES_TYPE = 'series'

export const Movie = ({
  Type,
  Poster,
  Title,
  Country = 'N/A',
  Year,
  imdbRating,
  Genre,
  imdbID,
}: IMovie) => {
  const seriesLabel =
    Type === SERIES_TYPE ? (
      <Typography
        sx={{
          fontSize: '0.90em',
          position: 'absolute',
          left: '5%',
          top: '5%',
          background: 'var(--gray-xl)',
          borderRadius: 1,
          px: 1,
          py: 1,
        }}
      >
        TV Series
      </Typography>
    ) : null

  const posterImage = Poster !== 'N/A' ? Poster : DefaultPosterImage.src

  return (
    <Card
      sx={{
        maxWidth: 300,
        width: '100%',
        height: 450,
        position: 'relative',
        background: 'var(--blue-600)',
      }}
    >
      <CardMedia
        component="img"
        height={450}
        image={posterImage}
        alt="movie"
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          transition: 'transform .2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />

      {seriesLabel}

      <Tooltip title="Click to see full movie" placement="right-end">
        <Link href={ROUTES.MOVIE_ID()} as={ROUTES.MOVIE_ID(imdbID)}>
          <CardContent
            sx={{
              position: 'absolute',
              height: '42%',
              width: '100%',
              bottom: '0',
              zIndex: 2,
              backdropFilter: 'blur(100px) brightness(70%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Typography sx={{ fontSize: '0.85em' }}>
                {Country}, {Year}
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.15em',
                  overflow: 'hidden',
                  maxHeight: 'calc(1em * 1.5 * 2)',
                  fontWeight: 700,
                }}
              >
                {Title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {imdbRating ? (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    fontSize: '0.65em',
                  }}
                >
                  <Box
                    sx={{
                      background: 'var(--yellow-700)',
                      fontWeight: 700,
                      py: 1,
                      px: 1,
                      width: 'max-content',
                      borderRadius: 1,
                    }}
                  >
                    IMDb
                  </Box>
                  <Typography>{imdbRating}</Typography>
                </Box>
              ) : null}
              {Genre ? (
                <Typography
                  sx={{
                    fontSize: '0.75em',
                    opacity: 0.75,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {Genre}
                </Typography>
              ) : null}
            </Box>
          </CardContent>
        </Link>
      </Tooltip>
    </Card>
  )
}
