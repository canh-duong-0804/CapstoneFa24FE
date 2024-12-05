import { useEffect, useState } from "react"
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Progress, Button } from 'reactstrap'
import { DatePicker } from 'antd'
import moment from 'moment'
import { Circle } from 'react-feather'
import api from '../../../../api/index'
import '@styles/react/libs/charts/apex-charts.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(moment())

  useEffect(() => {
    const formattedDate = selectedDate.format('YYYY-MM-DD')
    api.mainDashboardApi.getMainDashboardApi(formattedDate).then(response => {
      setDashboardData(response)
    }).catch(error => {
      console.error('Error fetching dashboard data:', error)
    })
  }, [selectedDate])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className='dashboard-container'>
      <Row className='match-height'>
        <Col lg='8' md='12'>
          <Card>
            <div className="align-items-center">
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                style={{
                  width: 150,
                  marginRight: 10
                }}
              />
            </div>
            <CardHeader className='d-flex justify-content-between align-items-center'>
              <CardTitle tag='h4' className="me-3">Mục tiêu calorie</CardTitle>
              <h2 className='text-primary'>{dashboardData?.totalCalories || 0} cals</h2>
              <div>

              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='4'>
                  <div className='d-flex flex-column align-items-center mb-2'>
                    <h6 className='mb-1'>Tập thể dục</h6>
                    <h4 className='text-primary mb-0'>{dashboardData?.caloriesBurn || 0}</h4>
                  </div>
                  <div className='d-flex flex-column align-items-center mb-2'>
                    <h6 className='mb-1'>Bước chân</h6>
                    <h4 className='text-primary mb-0'>0</h4>
                  </div>
                  <div className='d-flex flex-column align-items-center mb-2'>
                    <h6 className='mb-1'>Nước</h6>
                    <h4 className='text-primary mb-0'>{dashboardData?.amountWater || 0}</h4>
                  </div>
                </Col>

                <Col md='4'>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                      <div style={{ width: 200, height: 200 }}>
                        <CircularProgressbar 
                          value={dashboardData?.totalCalories > 0 ? Math.min(100, (dashboardData?.caloriesIntake / dashboardData?.totalCalories) * 100) : 0}
                          text={`${dashboardData?.caloriesIntake || 0}`}
                          textChildren={
                            <div className='text-center mt-2'>
                              <small className='d-block'>ĐÃ TIÊU THỤ</small>
                              <h4 className='text-muted'>
                                {Math.max(0, (dashboardData?.totalCalories || 0) - (dashboardData?.caloriesIntake || 0))} cals còn lại
                              </h4>
                            </div>
                          }
                          styles={buildStyles({
                            pathColor: '#28c76f', 
                            textColor: '#28c76f',
                            trailColor: '#e9ecef',
                            pathTransitionDuration: 0.5
                          })}
                        />
                        <div className='text-center mt-2'>
                          <small className='d-block'>ĐÃ TIÊU THỤ</small>
                          <h4 className='text-muted'>
                            {Math.max(0, (dashboardData?.totalCalories || 0) - (dashboardData?.caloriesIntake || 0))} cals còn lại
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Col>

                <Col md='4'>
                  <div className='d-flex flex-column align-items-center mb-2'>
                    <h6 className='mb-1'>Protein ({dashboardData?.proteinIntake || 0}g)</h6>
                    <Progress
                      value={(dashboardData?.proteinIntake / dashboardData?.totalProtein) * 100}
                      className='progress-bar-primary'
                    />
                  </div>
                  <div className='d-flex flex-column align-items-center mb-2'>
                    <h6 className='mb-1'>Carbs ({dashboardData?.carbsIntake || 0}g)</h6>
                    <Progress
                      value={(dashboardData?.carbsIntake / dashboardData?.totalCarb) * 100}
                      className='progress-bar-warning'
                    />
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                    <h6 className='mb-1'>Fat ({dashboardData?.fatIntake || 0}g)</h6>
                    <Progress
                      value={(dashboardData?.fatIntake / dashboardData?.totalFat) * 100}
                      className='progress-bar-success'
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col lg='4' md='12'>
          <Card>
            <CardBody>
              <div className='mb-2'>
                <p>
                  Kế hoạch cân nặng: {dashboardData?.goalType} {Math.abs(dashboardData?.weightDifference)}kg đến {dashboardData?.targetDate}
                </p>
              </div>
              <div className='mb-2'>
                <p>Cân nặng hiện tại: {dashboardData?.weight}kg</p>
              </div>
              <div className='d-flex justify-content-end'>
                <Button color='flat-primary' className='me-1'>CÂN NẶNG</Button>
                <Button color='flat-primary' className='me-1'>KẾ HOẠCH</Button>
                <Button color='flat-primary'>BIỂU ĐỒ</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard