import { lazy } from 'react'

const NotFound = lazy(() => import('@/pages/notFound'))
const Login = lazy(() => import('@/pages/login'))
const Main = lazy(() => import('@/pages/main'))

const comRoutes = [
  {
    path: '/',
    element: <div>Hello world!111</div>
  },
  {
    path: '/notFound',
    element: <NotFound />
    // meta: {
    //   title: '页面异常',
    // },
  },
  {
    path: '/main',
    element: <Main />
  },
  {
    path: '/login',
    element: <Login />
  }
]

export default comRoutes
