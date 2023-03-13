export enum ResponseType {
  SUCCESS = 'True',
  FAILURE = 'False',
}

export type SuccessfullTitleResponse<IData> = IData & {
  Response: ResponseType.SUCCESS
}

export type FailureTitleResponse = {
  Response: ResponseType.FAILURE
  Error: string
}

export interface ITitleSearch {
  title?: string
  year?: string
}

export type SuccessfulSeriesResponse<IData> = {
  Search: IData[]
  totalResults: string
  Response: ResponseType.SUCCESS
}

export interface FailureSeriesResponse {
  Response: ResponseType.FAILURE
  Error: string
}

export interface ISeriesSearch {
  series?: string
  year?: string
  page?: string | number
}
