import { lazy } from 'react'

const DashboardTrainer = lazy(() => import('../../views/dashboard/trainer/index'))
const Excercise = lazy(() => import('../../views/pages/admin/manage-excercise/excercise/index'))
const ExcercisePlan = lazy(() => import('../../views/pages/admin/manage-excercise/exercise-plan/index'))
const ChatTrainer = lazy(() => import('../../views/pages/manage-support/chat-trainer/index'))

const ExerciseTrainerRoutes = [
  {
    path: '/exercise-trainer/dashboard',
    element: <DashboardTrainer />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/exercise-trainer/manage-excercise',
    element: <Excercise />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/exercise-trainer/exercise-plan',
    element: <ExcercisePlan />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  },
  {
    path: '/exercise-trainer/chat',
    element: <ChatTrainer />,
    meta: {
      action: 'read',
      resource: 'All'
    }
  }


]

export default ExerciseTrainerRoutes
