import jwtDecode from 'jwt-decode'
import { isBefore } from 'date-fns'

type TokenParam = string | null | undefined

interface TokenPayload {
  userId: string
  userType: string
  email: {
    verifyStatus: string
    _id: string
    value: string
  }
  credentialKey: string
  tokenType: string
  iat: number
  exp: number
}

export const getTokenPayload = (token: string) =>
  jwtDecode(token) as TokenPayload

export const isTokenExpire = (token: TokenParam) => {
  if (token == null) {
    return true
  }

  const { exp } = getTokenPayload(token)

  if (exp == null) {
    return false
  }

  return isBefore(exp * 1000, Date.now())
}
