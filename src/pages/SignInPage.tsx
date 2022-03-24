import type { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const SignInPage: FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Sign In Page</h1>

      <Button onClick={() => navigate('/profile')}>To profile page</Button>
    </div>
  )
}

export default SignInPage
