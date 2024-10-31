// ** React Imports
import { Outlet } from 'react-router-dom'
//import { getSelectedRole } from '../utility/Utils'
import { useState, useEffect } from 'react'
// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'

const VerticalLayout = props => {
  const userData = window.localStorage.getItem('userData')
  const parsedData = JSON.parse(userData)
    const role = parsedData.role
  const [menuData, setMenuData] = useState([])
  useEffect(() => {
    switch (role) {
      case 0:
        setMenuData(navigation.filter(item => item.id >= 1 && item.id <= 9))
        break
      case 1:
        setMenuData(navigation.filter(item => item.id >= 10 && item.id <= 16))
        break
      case 2:
        setMenuData(navigation.filter(item => item.id >= 15 && item.id <= 16))
        break
      case 3:
        setMenuData(navigation.filter(item => item.id >= 17 && item.id <= 24))
        break
      default:
        // Mặc định, nếu không có vai trò nào khớp
        setMenuData([])
        break
    }
  }, [role])

  return (
    <Layout menuData={menuData} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
