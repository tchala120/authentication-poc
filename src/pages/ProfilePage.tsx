import type { FC } from 'react'

import useAuthContext from 'contexts/useAuthContext'

const ProfilePage: FC = () => {
  const { user } = useAuthContext()

  return (
    <div>
      <h1>Profile Page</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default ProfilePage
