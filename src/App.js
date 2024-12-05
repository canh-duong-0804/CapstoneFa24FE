import { Suspense } from 'react'
import AppRoutes from './router/Router'
import Spinner from './@core/components/spinner/Fallback-spinner'

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <AppRoutes />
    </Suspense>
  )
}

export default App
