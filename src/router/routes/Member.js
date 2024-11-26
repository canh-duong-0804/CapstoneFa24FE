import { lazy } from 'react'

const DashboardMember = lazy(() => import('../../views/dashboard/member/index'))
const Statistic = lazy(() => import('../../views/pages/statistic/dashboard/index'))
const FoodMember = lazy(() => import('../../views/apps/todo'))
const ExerciseMember = lazy(() => import('../../views/apps/calendar'))
const Account = lazy(() => import('../../views/pages/admin/account/index'))
const Excercise = lazy(() => import('../../views/pages/admin/manage-excercise/excercise/index'))
const Category = lazy(() => import('../../views/pages/admin/manage-excercise/category/index'))
const Food = lazy(() => import('../../views/pages/admin/manage-food/food/index'))
const Ingredient = lazy(() => import('../../views/pages/admin/manage-food/ingredient/index'))
const Recipe = lazy(() => import('../../views/pages/admin/manage-food/recipe/index'))
const MemberRoutes = [
  {
    path: '/dashboard',
    element: <DashboardMember />,
    meta: {
      action: 'read',
      resource: 'User'
    }
  },
  {
    element: <FoodMember />,
    path: '/food/member',
    meta: {
      action: 'read',
      resource: 'User'
    }
  },
  {
    element: <ExerciseMember />,
    path: '/exercise/member',
    meta: {
      action: 'read',
      resource: 'User'
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
  }
]

export default MemberRoutes
