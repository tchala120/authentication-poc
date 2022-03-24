import type { FC } from 'react'

import { Button } from 'antd'
import { Link } from 'react-router-dom'

import useAuthContext from 'contexts/useAuthContext'

import { path } from 'setup/PageRouter'

const ProfilePage: FC = () => {
  const { user } = useAuthContext()

  return (
    <div>
      <h1>Profile Page</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Link to={path.setting}>
        <Button type="primary">Go to setting page</Button>
      </Link>
    </div>
  )
}

export default ProfilePage
