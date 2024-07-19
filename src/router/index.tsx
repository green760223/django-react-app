import { createHashRouter, Navigate } from 'react-router-dom'
import SignIn from '../views/signin/SignIn'
import SignUp from '../views/SignUp'
import NotFound from '../views/NotFound'
import Dashboard from '../views/dashboard/Dashboard'

const router = [
  {
    path: '/',
    element: <Navigate to='/signin' />
  },
  {
    path: 'signin',
    element: <SignIn />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: 'dashboard',
    element: <Dashboard />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <NotFound />
  }
]

export default createHashRouter(router)
