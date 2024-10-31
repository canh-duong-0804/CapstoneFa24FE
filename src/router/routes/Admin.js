import { lazy } from 'react'

const DashboardAdmin = lazy(() => import('../../views/pages/admin/dashboard/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Account = lazy(() => import('../../views/pages/admin/account/index'))
const Excercise = lazy(() => import('../../views/pages/admin/manage-excercise/excercise/index'))

const AdminRoutes = [
  {
    path: '/admin/dashboard',
    element: <DashboardAdmin />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/admin/statistic',
    element: <Statistic />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/admin/manage-account',
    element: <Account />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/admin/manage-excercise',
    element: <Excercise />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  }
]

export default AdminRoutes
