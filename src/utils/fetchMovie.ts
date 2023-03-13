import { axios } from '@utils'
import {
  FailureTitleResponse,
  IMovie,
  ResponseType,
  SuccessfullTitleResponse,
} from '@models'

export const fetchMovie = async (id: string) => {
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
      props: {
        error: { error: data.Error },
      },
    }
  }

  return {
    props: data,
  }
}
