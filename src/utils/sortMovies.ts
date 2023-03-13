import { SortFieldType, SortType } from '@models'

type SortObject<TKeys extends string> = {
  [Key in TKeys]: string
}

export const sortMovies = <TObj extends SortObject<SortFieldType>>(
  movies: TObj[],
  field: SortFieldType,
  sortType: SortType
) => {
  return [...movies].sort((firstMovie, secondMovie) => {
    if (sortType === "ASC") {
      return firstMovie[field].toLowerCase() < secondMovie[field].toLowerCase() ? -1 : 1;
    }
    return firstMovie[field].toLowerCase() < secondMovie[field].toLowerCase() ? 1 : -1;
  })
}
