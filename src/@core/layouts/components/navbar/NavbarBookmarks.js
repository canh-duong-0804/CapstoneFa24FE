import { Fragment } from 'react'
import * as Icon from 'react-feather'
import { NavLink } from 'react-router-dom'
import { NavItem } from 'reactstrap'

const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props
  // ** Store Vars

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu me-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <ul className='nav navbar-nav bookmark-icons'>
        <NavItem className='navbar-custom navbar-custom-fisrt' >
          <NavLink className='' to='/food/member'>
            Món ăn
          </NavLink>
        </NavItem>
        <NavItem className='navbar-custom' >
          <NavLink className='' to='/exercise/member'>
            Bài tập
          </NavLink>
        </NavItem>
        <NavItem className='navbar-custom' >
          <NavLink className='' to='/chat/member'>
            Chat
          </NavLink>
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarBookmarks
