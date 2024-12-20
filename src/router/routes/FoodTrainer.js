import { lazy } from 'react'

const DashboardTrainer = lazy(() => import('../../views/dashboard/trainer/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Food = lazy(() => import('../../views/pages/admin/manage-food/food/index'))
const MealPlan = lazy(() => import('../../views/pages/manage-support/chat-trainer/index'))
const ChatTrainer = lazy(() => import('../../views/pages/manage-support/chat-trainer/index'))

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
  },
  {
    path: '/food-trainer/manage-meal-plan',
    element: <MealPlan />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/food-trainer/chat',
    element: <ChatTrainer />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  }
  
]

export default FoodTrainerRoutes
