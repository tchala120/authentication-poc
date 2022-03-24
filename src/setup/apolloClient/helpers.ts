import { ApolloClient, InMemoryCache } from '@apollo/client'
import { loader } from 'graphql.macro'

import { accessToken, clearStorage, refreshToken } from 'services/localStorage'

import apolloClient from './apolloClient'

import type { AuthToken } from 'contexts/useAuthContext'
import type {
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables,
} from 'graphQL/generated/operations'

const MUTATION_DOCUMENT = loader(
  '../../graphQL/documents/refreshAccessToken.gql'
)

const client = new ApolloClient({
  uri: process.env.REACT_APP_CORE_SERVICE_URL,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

export const getToken = () =>
  new Promise<AuthToken | undefined>((resolve, reject) => {
    const token = refreshToken.get()

    if (token == null) {
      resolve(undefined)
      return
    }

    return client
      .mutate<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>({
        mutation: MUTATION_DOCUMENT,
        variables: {
          refreshToken: token,
        },
      })
      .then(({ data }) => {
        const newToken = data?.refreshAccessToken.payload

        if (newToken == null) {
          resolve(undefined)
          return
        }

        accessToken.set(newToken.accessToken)
        refreshToken.set(newToken.refreshToken)

        resolve(newToken)
      })
      .catch((error) => {
        clearStorage()
        apolloClient.resetStore()
        window.open('/sign-in', '_self')

        reject(error)
      })
  })

export const getHeaders = (defaultHeaders: any, newAccessToken?: string) => {
  const headers = {
    ...defaultHeaders,
    authorization:
      newAccessToken != null ? `Bearer ${newAccessToken}` : undefined,
    credentialKey: 'MOE_SAFETY_CENTER_ADMIN_DEV',
  }

  return headers
}
