import { Table, Card } from 'reactstrap'
import api from '../../../api'
import { useEffect, useState, React } from 'react'
// import { CardTitle } from 'antd'
const TopFoodsTable = () => {
  const [data, setData] = useState(null)
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0') 

  const formattedDate = `${year}-${month}-${day}`

  useEffect(() => {
    api.dashboardApi.getMainDashboardTrainerApi(formattedDate).then(res => setData(res))
    return () => setData(null)
  }, [])

  // Đảm bảo `data` đã được lấy từ API và đã có dữ liệu
  if (!data) return null
  return (
    <Card className='card-top-foods-table'>
      {/* <CardHeader>
        <CardTitle tag='h4'>Top 5 Món Ăn</CardTitle>
      </CardHeader> */}
      <Table responsive>
        <thead>
          <tr>
            <th>Tên Món Ăn</th>
            <th>Số Lần Sử Dụng</th>
            <th>Tỷ Lệ Sử Dụng</th>
          </tr>
        </thead>
        <tbody>
          {data.topFoodStatistics.map((food) => (
            <tr key={food.foodId}>
              <td>{food.foodName}</td>
              <td>{food.usageCount}</td>
              <td>{food.usagePercentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

export default TopFoodsTable