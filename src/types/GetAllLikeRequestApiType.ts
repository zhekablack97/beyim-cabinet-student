export interface GetAllLikeRequestApiType {
    success: boolean
    message: string
    data: Data
  }
  
  export interface Data {
    data: Daum[]
    total: number
    limit: number
    offset: number
    isLastPage: boolean
  }
  
  export interface Daum {
    id: number
    postId: string
    userId: string
    createdAt: string
    updatedAt: string
  }
  