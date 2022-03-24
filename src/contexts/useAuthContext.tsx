import type { FC } from 'react'

import { createContext, useContext, useState } from 'react'
import { useEffectOnce } from 'react-use'
import { useApolloClient } from '@apollo/client'

import { useGetMyProfileLazyQuery } from 'graphQL/generated/operations'

import { accessToken, clearStorage, refreshToken } from 'services/localStorage'

import type { GetMyProfileData } from 'graphQL/types'

interface AuthToken {
  accessToken: string
  refreshToken: string
}

interface AuthContextData {
  token?: AuthToken
  user?: GetMyProfileData
  signIn: (authToken: AuthToken) => void
  signOut: VoidFunction
}

const AuthContext = createContext<any>(null)

export const AuthProvider: FC = ({ children }) => {
  const client = useApolloClient()

  const storageToken = accessToken.get()

  const [authLoading, setAuthLoading] = useState(storageToken != null)
  const [token, setToken] = useState<AuthToken>()
  const [user, setUser] = useState<GetMyProfileData>()

  const [getMyProfile, getMyProfileResp] = useGetMyProfileLazyQuery({
    onCompleted(resp) {
      setUser(resp.getMyProfile.payload)
      setAuthLoading(false)
    },
  })

  const signIn = (authToken: AuthToken) => {
    setToken(authToken)

    accessToken.set(authToken.accessToken)
    refreshToken.set(authToken.refreshToken)

    getMyProfile()
  }

  const signOut = () => {
    clearStorage()
    client.clearStore()
  }

  const loading = authLoading || getMyProfileResp.loading
  const value: AuthContextData = {
    token,
    user,
    signIn,
    signOut,
  }

  useEffectOnce(onFirstSignIn)

  return (
    <AuthContext.Provider value={value}>
      {loading ? 'Loading...' : children}
    </AuthContext.Provider>
  )

  function onFirstSignIn() {
    if (storageToken == null) {
      return
    }

    getMyProfile()
  }
}

export default function useAuthContext() {
  return useContext<AuthContextData>(AuthContext)
}
