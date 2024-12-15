import { Fragment } from 'react'
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import { getHomeRouteForLoggedInUser, getUserData } from '../../../../utility/Utils'
import themeConfig from '@configs/themeConfig'
import { NavLink } from 'react-router-dom'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  const user = getUserData()

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavLink to={user ? getHomeRouteForLoggedInUser(user.role) : '/'} className='navbar-brand p-0 me-0'>
          <span className='brand-logo'>
            <img className='mb-25' height={35} src={themeConfig.app.appLogoImageNoText} alt='logo' />
          </span>
          <h2 className='brand-text mb-0'>{themeConfig.app.appName}</h2>
        </NavLink>
        {user && user.role !== 0 && !user.role && (
          <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        )}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar