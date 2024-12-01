import { lazy } from 'react'

const DashboardMember = lazy(() => import('../../views/dashboard/member/index'))
const FoodMember = lazy(() => import('../../views/apps/calendar'))
const ExerciseMember = lazy(() => import('../../views/apps/todo'))
const Chat = lazy(() => import('../../views/apps/chat'))
const MemberRoutes = [
  {
    path: '/home',
    element: <DashboardMember />,
    meta: {
      action: 'read',
      menuHidden: true,
      resource: 'User'
    }
  },
  {
    element: <FoodMember />,
    path: '/food/member',
    meta: {
      action: 'read',
      menuHidden: true,
      resource: 'User'
    }
  },
  {
    element: <ExerciseMember />,
    path: '/exercise/member',
    meta: {
      action: 'read',
      menuHidden: true,
      resource: 'User'
    }
  },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      action: 'read',
      menuHidden: true,
      resource: 'User'
    }
  }
]

export default MemberRoutes
