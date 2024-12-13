import { lazy } from 'react'

const DashboardTrainer = lazy(() => import('../../views/dashboard/trainer/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Food = lazy(() => import('../../views/pages/admin/manage-food/food/index'))
const Recipe = lazy(() => import('../../views/pages/admin/manage-food/recipe/index'))
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
    path: '/food-trainer/statistic',
    element: <Statistic />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/food-trainer/manage-food',
    element: <Food />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  }
  
]

export default FoodTrainerRoutes
