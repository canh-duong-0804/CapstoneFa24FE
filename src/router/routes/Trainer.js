import { lazy } from 'react'

const DashboardTrainer = lazy(() => import('../../views/dashboard/trainer/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Excercise = lazy(() => import('../../views/pages/trainer/manage-exercise/excercise/index'))
const Food = lazy(() => import('../../views/pages/admin/manage-food/food/index'))
const MealPlan = lazy(() => import('../../views/pages/admin/manage-food/meal-plan/index'))
const Support = lazy(() => import('../../views/pages/manage-support/support/index'))
const ExercisePlan = lazy(() => import('../../views/pages/admin/manage-excercise/exercise-plan/index'))

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
    path: '/trainer/manage-food',
    element: <Food />,
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
  },
  {
    path: '/trainer/manage-meal-plan',
    element: <MealPlan />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/trainer/manage-exercise-plan',
    element: <ExercisePlan />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/trainer/support',
    element: <Support />,
    meta: {
      action: 'read',
      resource: 'All'     
    }
  }
]

export default TrainerRoutes
