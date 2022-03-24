import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

import { accessToken } from 'services/localStorage'
import { message } from 'antd'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_CORE_SERVER_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = accessToken.get()

  return {
    headers: {
      ...headers,
      authorization: token != null ? `Bearer ${token}` : undefined,
      credentialKey: 'MOE_SAFETY_CENTER_ADMIN_DEV',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => message.error(error.message))
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

export default apolloClient
