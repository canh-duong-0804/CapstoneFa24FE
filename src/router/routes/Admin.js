import { lazy } from 'react'

const DashboardAdmin = lazy(() => import('../../views/dashboard/admin/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const Account = lazy(() => import('../../views/pages/admin/account/index'))
const Excercise = lazy(() => import('../../views/pages/admin/manage-excercise/excercise/index'))
const Category = lazy(() => import('../../views/pages/admin/manage-excercise/category/index'))
const Food = lazy(() => import('../../views/pages/admin/manage-food/food/index'))
const Ingredient = lazy(() => import('../../views/pages/admin/manage-food/ingredient/index'))
const Recipe = lazy(() => import('../../views/pages/admin/manage-food/recipe/index'))
const MealPlan = lazy(() => import('../../views/pages/admin/manage-food/meal-plan/index'))

const AdminRoutes = [
  {
    path: '/dashboard/admin',
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
  },
  {
    path: '/admin/exercise-category',
    element: <Category />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/admin/manage-food',
    element: <Food />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/admin/manage-ingredient',
    element: <Ingredient />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/admin/manage-recipe',
    element: <Recipe />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/admin/manage-meal-plan',
    element: <MealPlan />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  }
]

export default AdminRoutes
