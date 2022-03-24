import type { FC } from 'react'

import { ApolloProvider } from '@apollo/client'

import './global.css'

import setupStorage from 'services/localStorage'

import PageRouter from 'setup/PageRouter'
import apolloClient from 'setup/apolloClient'

setupStorage()

const App: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <PageRouter />
    </ApolloProvider>
  )
}

export default App
