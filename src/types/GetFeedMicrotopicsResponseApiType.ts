

export interface Result {
  ids: number[]
}

export interface Data {
  result: Result
}

export interface GetFeedMicrotopicsResponseApiType {
  success: boolean
  message: string
  data: Data
}



