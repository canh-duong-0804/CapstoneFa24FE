import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import { isUserLoggedIn } from '@utils'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])
  console.log('userData', userData)

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['username']) || ''}</span>
          <span className='user-status'>{userData && userData.role === 0 ? 'Admin' : userData && userData.role === 1 ? 'Huấn luyện viên' : userData && userData.role === 2 ? 'Huấn luyện viên món ăn' : userData && userData.role === 3 ? 'Huấn luyện viên bài tập' :  'Thành viên'}
          </span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Hồ sơ</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Đăng xuất</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
