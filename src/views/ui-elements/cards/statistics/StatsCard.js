// ** Third Party Components
import classnames from 'classnames'
import {User, Book, Coffee, Activity } from 'react-feather'
import api from '../../../../api'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useEffect, useState } from 'react'

const StatsCard = ({ cols }) => {
  const [data, setData] = useState(null)
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0') 

  const formattedDate = `${year}-${month}-${day}`

  useEffect(() => {
    api.dashboardApi.getMainDashboardAdminApi(formattedDate).then(res => setData(res))
    return () => setData(null)
  }, [])

  // Đảm bảo `data` đã được lấy từ API và đã có dữ liệu
  if (!data) return null

  const statsData = [
    {
      title: data.totalUsers,
      subtitle: 'Người dùng',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: data.totalFoods,
      subtitle: 'Món ăn',
      color: 'light-primary',
      icon: <Coffee size={24} />
    },
    {
      title: data.totalExercises,
      subtitle: 'Bài tập',
      color: 'light-danger',
      icon: <Activity size={24} />
    },
    {
      title: data.newUsersThisMonth,
      subtitle: 'Người dùng mới',
      color: 'light-success',
      icon: <User size={24} />
    }
  ]

  const renderData = () => {
    return statsData.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== statsData.length - 1
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Thống kê</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
