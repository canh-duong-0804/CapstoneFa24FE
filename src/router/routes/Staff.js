import { lazy } from 'react'

const DashboardStaff = lazy(() => import('../../views/dashboard/staff/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Account = lazy(() => import('../../views/pages/admin/account/index'))
const Excercise = lazy(() => import('../../views/pages/trainer/manage-exercise/excercise/index'))

const StaffRoutes = [
  {
    path: '/staff/dashboard',
    element: <DashboardStaff />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/trainer/statistic',
    element: <Statistic />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/trainer/manage-account',
    element: <Account />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/trainer/manage-excercise',
    element: <Excercise />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  }
]

export default StaffRoutes
