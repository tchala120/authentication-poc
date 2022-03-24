import type { FC } from 'react'

import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const PageLayout: FC = () => {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  )
}

export default PageLayout

const LayoutContainer = styled.div`
  max-width: 1024px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px;
`
