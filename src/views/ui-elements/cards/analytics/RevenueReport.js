// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'

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

  useEffect(() => {
    axios.get('/card/card-analytics/revenue-report').then(res => setData(res.data))
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
        categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9'],
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
        name: 'Earning',
        data: [95, 177, 284, 256, 105, 63, 168, 218, 72]
      }
      // {
      //   name: 'Expense',
      //   data: [-145, -80, -60, -180, -100, -60, -85, -75, -100]
      // }
    ]

  // const budgetSeries = [
  //     {
  //       data: [61, 48, 69, 52, 60, 40, 79, 60, 59, 43, 62]
  //     },
  //     {
  //       data: [20, 10, 30, 15, 23, 0, 25, 15, 20, 5, 27]
  //     }
  //   ],
  //   budgetOptions = {
  //     chart: {
  //       toolbar: { show: false },
  //       zoom: { enabled: false },
  //       type: 'line',
  //       sparkline: { enabled: true }
  //     },
  //     stroke: {
  //       curve: 'smooth',
  //       dashArray: [0, 5],
  //       width: [2]
  //     },
  //     colors: [props.primary, '#dcdae3'],
  //     tooltip: {
  //       enabled: false
  //     }
  //   }

  return data !== null ? (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' md='12' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>Số lượng người dùng hoạt động trong năm {selectedYear}</CardTitle>
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
          <Chart id='revenue-report-chart' type='bar' height='230' options={revenueOptions} series={revenueSeries} />
        </Col>
      </Row>
    </Card>
  ) : null
}

export default RevenueReport
