import {
    Box, CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material'
import DefaultPosterImage from '@assets/DefaultPosterImage.jpg'
import { getTableData } from '@utils'
import { fetchMovie } from '@/utils/fetchMovie'
import { IMovie } from '@models'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { ROUTES } from '@config'
import Link from "next/link";

const TABLE_FIELDS = [
  'Genre',
  'Director',
  'Released',
  'imdbRating',
  'Metascore',
  'Runtime',
]

export default function MoviePage({
  props,
}: {
  props: IMovie & { error?: string }
}) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
      </Box>
    )
  }

  if (props.error) {
    return (
      <Box>
        Something went wrong, <Link style={{color: "lightblue"}} href={ROUTES.HOME}>go back</Link>
      </Box>
    )
  }

  const tableRows = getTableData(props, TABLE_FIELDS as (keyof IMovie)[])

  const movieImage =
    props.Poster !== 'N/A' ? props.Poster : DefaultPosterImage.src

  return (
    <Box sx={{ pb: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 5,
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '300px',
            height: '450px',
            margin: '0 auto',
          }}
        >
          <img
            src={movieImage}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            alt={props.Plot}
          />
        </Box>
        <Box
          sx={{ display: 'flex', gap: 5, flexBasis: '500px', flexShrink: 1 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '1em' }}>
                {props.Country}, {props.Year}
              </Typography>
              <Typography sx={{ fontSize: '2.5em' }}>{props.Title}</Typography>
            </Box>

            <Table>
              <TableBody>
                {tableRows.map(([label, value]) => (
                  <TableRow key={label}>
                    <TableCell
                      align="left"
                      sx={{ color: (theme) => theme.palette.primary.main }}
                    >
                      {label}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: (theme) => theme.palette.primary.main }}
                    >
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 5 }}>
        <Typography>Actors: {props.Actors}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {props.Ratings.map(({ Source, Value }) => (
            <Typography key={Source}>
              {Source}: {Value}
            </Typography>
          ))}
        </Box>
        <Typography>Awards: {props.Awards}</Typography>
        <Typography>{props.Plot}</Typography>
      </Box>
    </Box>
  )
}

export async function getStaticProps({ params }) {
  const movie = await fetchMovie(params.movieId)

  return {
    props: movie,
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  }
}
