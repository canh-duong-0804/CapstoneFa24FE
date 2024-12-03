// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import Chart from 'react-apexcharts'
import api from '../../../../api/index'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
  UncontrolledButtonDropdown
} from 'reactstrap'

const RevenueReport = props => {
  // ** State
  const [data, setData] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()) // Khởi tạo năm hiện tại
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState)
  
  // Hàm để xử lý thay đổi năm
  const handleYearChange = (year) => {
    setSelectedYear(year)
    // Gọi API hoặc cập nhật dữ liệu cho biểu đồ theo năm đã chọn
    // updateChartData(year);
  }
  
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0') 

  const formattedDate = `${year}-${month}-${day}`
  useEffect(() => {
    api.dashboardApi.getMainDashboardAdminApi(formattedDate).then(res => setData(res.userRegistrationStatistics))
    return () => setData(null)
  }, [])

  const revenueOptions = {
      chart: {
        stacked: true,
        type: 'bar',
        toolbar: { show: false }
      },
      grid: {
        padding: {
          top: -20,
          bottom: -10
        },
        yaxis: {
          lines: { show: false }
        }
      },
      xaxis: {
        // Cập nhật categories để bao gồm đủ 12 tháng
        categories: [
          'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 
          'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 
          'Tháng 11', 'Tháng 12'
        ],
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '0.86rem'
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      colors: [props.primary, props.warning],
      plotOptions: {
        bar: {
          columnWidth: '17%',
          borderRadius: [5]
        },
        distributed: true
      },
      yaxis: {
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '0.86rem'
          }
        }
      }
    },
    revenueSeries = [
      {
        name: 'Người dùng',
        data: data ? [
          data.find(item => item.month === 1)?.userCount || 0,
          data.find(item => item.month === 2)?.userCount || 0,
          data.find(item => item.month === 3)?.userCount || 0,
          data.find(item => item.month === 4)?.userCount || 0,
          data.find(item => item.month === 5)?.userCount || 0,
          data.find(item => item.month === 6)?.userCount || 0,
          data.find(item => item.month === 7)?.userCount || 0,
          data.find(item => item.month === 8)?.userCount || 0,
          data.find(item => item.month === 9)?.userCount || 0,
          data.find(item => item.month === 10)?.userCount || 0,
          data.find(item => item.month === 11)?.userCount || 0,
          data.find(item => item.month === 12)?.userCount || 0
        ] : []
      }
    ]

  return data !== null ? (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' md='12' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>
              Số lượng người đăng ký trong năm {selectedYear}
            </CardTitle>
            <div className='d-flex align-items-center'>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                  Chọn năm: {selectedYear}
                </DropdownToggle>
                <DropdownMenu>
                  {[2020, 2021, 2022, 2023, 2024].map((year) => (
                    <DropdownItem key={year} onClick={() => handleYearChange(year)}>
                      {year}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Chart 
            id='revenue-report-chart' 
            type='bar' 
            height='230' 
            options={revenueOptions} 
            series={revenueSeries} 
          />
        </Col>
      </Row>
    </Card>
  ) : null
}

export default RevenueReport