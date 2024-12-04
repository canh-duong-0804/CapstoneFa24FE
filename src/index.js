// ** React Imports
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ** Redux Imports
import { store } from './redux/store'
import { Provider } from 'react-redux'

// ** Intl & ThemeColors Context
import ability from './configs/acl/ability'
import { AbilityContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'

// ** ThemeConfig
import themeConfig from './configs/themeConfig'

// ** Toast
import { Toaster } from 'react-hot-toast'

// ** Component
import App from './App'

// ** Spinner
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Styles
import '@styles/base/pages/authentication.scss'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <App />
            <Toaster position={themeConfig.layout.toastPosition} />
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  </BrowserRouter>
)
