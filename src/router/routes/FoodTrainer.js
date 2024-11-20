import { lazy } from 'react'

const DashboardTrainer = lazy(() => import('../../views/dashboard/trainer/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Account = lazy(() => import('../../views/pages/admin/account/index'))
const Excercise = lazy(() => import('../../views/pages/trainer/manage-exercise/excercise/index'))

const FoodTrainerRoutes = [
  {
    path: '/food-trainer/dashboard',
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

export default FoodTrainerRoutes
