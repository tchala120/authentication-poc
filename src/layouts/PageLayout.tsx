import type { FC } from 'react'

import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const PageLayout: FC = () => {
  return (
    <LayoutContainer>
      <h1>Header page layout</h1>

      <Outlet />
    </LayoutContainer>
  )
}

export default PageLayout

const LayoutContainer = styled.div`
  width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
`
