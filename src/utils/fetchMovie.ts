import { axios } from '@utils'
import {
  FailureTitleResponse,
  IMovie,
  ResponseType,
  SuccessfullTitleResponse,
} from '@models'

export const fetchMovie = async (id?: string | number) => {
  if (!id) return { error: "Wrong movie id" };

  const { data } = await axios.get<
    SuccessfullTitleResponse<IMovie> | FailureTitleResponse
  >('', {
    params: {
      i: id,
      plot: 'full',
    },
  })

  if (data.Response === ResponseType.FAILURE) {
    return {
       error: data.Error,
    }
  }

  return {
    ...data,
  }
}
