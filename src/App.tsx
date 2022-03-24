import type { FC } from 'react'

import './global.css'

import PageRouter from 'setup/PageRouter'

import setupStorage from 'services/localStorage'

setupStorage()

const App: FC = () => {
  return <PageRouter />
}

export default App
