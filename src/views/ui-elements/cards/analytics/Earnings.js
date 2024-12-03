// ** Third Party Components
import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import api from '../../../../api'

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'

const Earnings = ({ success }) => {
   const [data, setData] = useState(null)
   const date = new Date()
   const year = date.getFullYear()
   const month = String(date.getMonth() + 1).padStart(2, '0')
   const day = String(date.getDate()).padStart(2, '0')
   
   const formattedDate = `${year}-${month}-${day}`

   useEffect(() => {
     api.dashboardApi.getMainDashboardAdminApi(formattedDate).then(res => setData(res.topFoodStatistics))
     return () => setData(null)
   }, [])

   // Prepare chart options and series based on API data
   const chartOptions = {
     chart: {
       toolbar: {
         show: false
       }
     },
     dataLabels: {
       enabled: false
     },
     legend: { show: false },
     labels: data ? data.map(item => item.foodName) : [],
     stroke: { width: 0 },
     colors: ['#28c76f66', '#28c76f33', success],
     grid: {
       padding: {
         right: -20,
         bottom: -8,
         left: -20
       }
     },
     plotOptions: {
       pie: {
         startAngle: -10,
         donut: {
           labels: {
             show: true,
             name: {
               offsetY: 15
             },
             value: {
               offsetY: -15,
               formatter(val) {
                 return `${parseInt(val)} %`
               }
             },
             total: {
               show: true,
               offsetY: 15,
               label: 'Tỷ lệ',
               formatter() {
                 return '100%'
               }
             }
           }
         }
       }
     },
     responsive: [
       {
         breakpoint: 1325,
         options: {
           chart: {
             height: 100
           }
         }
       },
       {
         breakpoint: 1200,
         options: {
           chart: {
             height: 120
           }
         }
       },
       {
         breakpoint: 1065,
         options: {
           chart: {
             height: 100
           }
         }
       },
       {
         breakpoint: 992,
         options: {
           chart: {
             height: 120
           }
         }
       }
     ]
   }

   return (
     <Card className='earnings-card'>
       <CardBody>
         <Row>
           <Col xs='6'>
             <CardTitle className='mb-1'>Món ăn được sử dụng nhiều nhất</CardTitle>
             <CardText className='text-muted font-small-2'>
             </CardText>
           </Col>
           <Col xs='6'>
             {data && (
               <Chart 
                 options={chartOptions} 
                 series={data.map(item => item.usagePercentage)} 
                 type='donut' 
                 height={120} 
               />
             )}
           </Col>
         </Row>
       </CardBody>
     </Card>
   )
}

export default Earnings