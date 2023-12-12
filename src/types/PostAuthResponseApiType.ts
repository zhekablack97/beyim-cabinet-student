export interface PostAuthResponseApiType{
    success: boolean
    message: string
    data: {
      tokenData:{
        access_token: string
        expires_in: number
        token_type: string
        id_token: string
        refresh_token: string
        challenge_name: string
        session: string
      }
    }
  }