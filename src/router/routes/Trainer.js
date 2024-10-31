import { lazy } from 'react'

const DashboardTrainer = lazy(() => import('../../views/pages/trainer/dashboard/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Account = lazy(() => import('../../views/pages/admin/account/index'))

const TrainerRoutes = [
  {
    path: '/trainer/dashboard',
    element: <DashboardTrainer />,
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
  }
]

export default TrainerRoutes
