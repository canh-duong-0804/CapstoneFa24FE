import { lazy } from 'react'

const Statistic = lazy(() => import('../../views/pages/admin/dashboard/index'))
const Account = lazy(() => import('../../views/pages/admin/account/index'))

const AdminRoutes = [
  {
    path: '/admin/dashboard',
    element: <Statistic />,
    meta: {
      action: 'read',
      resource: 'Admin'
    }
  },
  {
    path: '/admin/manage-account',
    element: <Account />
  }
]

export default AdminRoutes
