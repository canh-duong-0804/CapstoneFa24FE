import { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import CompanyTable from './CompanyTable'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCardTrainer'
import StatsExercise from '@src/views/ui-elements/cards/statistics/ChartjsDoughnutChart'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const AdminDashboard = () => {
  const { colors } = useContext(ThemeColors)


  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
      <Col lg='4' md='4' xs='12'>
          <Earnings success={colors.success.main} cols={{ xl: '3', sm: '6' }}/>
        </Col>
        <Col xl='8' md='8' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='8'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='4' xs='4'>
              <StatsExercise warning={colors.warning.main} />
            </Col>

        {/* <Col lg='4' md='6' xs='12'>
          <CardMeetup />
        </Col> */}
        {/* <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <GoalOverview success={colors.success.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col> */}
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='8'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='4' xs='4'>
          <GoalOverview success={colors.success.main} />
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard
