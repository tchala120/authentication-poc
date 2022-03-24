import {
  ApolloClient,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

import { getHeaders, getToken } from './helpers'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_CORE_SERVICE_URL,
})

const authLink = setContext((_, { headers }) =>
  getToken().then((newToken) => ({
    headers: getHeaders(headers, newToken?.accessToken),
  }))
)

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'TOKEN_IS_EXPIRED':
            console.log('Token is expired, try to call refresh token')

            return fromPromise(
              getToken().then((newToken) => {
                operation.setContext({
                  headers: getHeaders(
                    operation.getContext().headers,
                    newToken?.accessToken
                  ),
                })
              })
            )
              .filter((values) => Boolean(values))
              .flatMap(() => {
                console.log('Retry the request!')

                return forward(operation)
              })
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  }
)

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

export default apolloClient
