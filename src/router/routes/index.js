// ** React Imports
import { Fragment, lazy, Navigate } from 'react'

// ** Routes Imports
import ChartsRoutes from './Charts'
import AuthenticationRoutes from './Authentication'
import AdminRoutes from './Admin'
import TrainerRoutes from './Trainer'
import MemberRoutes from './Member'
import StaffRoutes from './Staff'
import FoodTrainerRoutes from './FoodTrainer'
import ExerciseTrainerRoutes from './ExerciseTrainer'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from '@utils'

// Import Features component
const Features = lazy(() => import('../../views/pages/features'))

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/login/admin'
const DefaultAdminRoute = '/login/admin'

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...ChartsRoutes,
  ...AdminRoutes,
  ...TrainerRoutes,
  ...MemberRoutes,
  ...StaffRoutes,
  ...FoodTrainerRoutes,
  ...ExerciseTrainerRoutes,
  {
    path: '/',
    element: <Navigate to={DefaultRoute} />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/features',
    element: <Features />,
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  }
]

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []
  if (Routes) {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {

          const Wrapper = isObjEmpty(route.element.props) && isBlank === false ? LayoutWrapper : Fragment
          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, DefaultAdminRoute, TemplateTitle, Routes, getRoutes }
