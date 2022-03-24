import { FC } from 'react'

import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import PageLayout from 'layouts/PageLayout'

import ProfilePage from 'pages/ProfilePage'
import SignInPage from 'pages/SignInPage'
import RegisterPage from 'pages/RegisterPage'
import SettingPage from 'pages/SettingPage'

import type { GetMyProfileData } from 'graphQL/types'

type RouteName = 'root' | 'signIn' | 'register' | 'profile' | 'setting'

type RoutePath = Record<RouteName, string>

export const path: RoutePath = {
  root: '/',
  register: '/register',
  signIn: '/sign-in',
  profile: '/profile',
  setting: '/setting',
}

const PageRouter: FC = () => {
  const user = undefined

  const redirectTo = user == null ? '/sign-in' : '/profile'

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path={path.root} element={<Navigate to={redirectTo} />} />

          <Route element={<SignInRoute user={user} />}>
            <Route path={path.signIn} element={<SignInPage />} />
            <Route path={path.register} element={<RegisterPage />} />
          </Route>

          <Route element={<AuthenticatedRoute user={user} />}>
            <Route path={path.profile} element={<ProfilePage />} />
            <Route path={path.setting} element={<SettingPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRouter

interface AuthenticatedRequiredRouteProps {
  user?: GetMyProfileData
}

const SignInRoute: FC<AuthenticatedRequiredRouteProps> = ({ user }) => {
  if (user != null) {
    return <Navigate to="/profile" />
  }

  return <Outlet />
}

const AuthenticatedRoute: FC<AuthenticatedRequiredRouteProps> = ({ user }) => {
  if (user == null) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
