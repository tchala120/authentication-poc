import type { FC } from 'react'

import { ApolloProvider } from '@apollo/client'
import { ConfigProvider } from 'antd'

import './global.css'

import setupStorage from 'services/localStorage'

import PageRouter from 'setup/PageRouter'
import apolloClient from 'setup/apolloClient'

setupStorage()

const App: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ConfigProvider
        form={{
          colon: false,
        }}
        componentSize="large"
      >
        <PageRouter />
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default App
