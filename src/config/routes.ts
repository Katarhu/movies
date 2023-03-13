export const ROUTES = {
  HOME: '/',
  SEARCH_TITLE: '/search_title',
  SEARCH_SERIES: '/search_series',
  MOVIE_ID: (id?: string) => id ? `/${id}` : '/[movieId]'
}