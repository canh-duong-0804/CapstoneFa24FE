import { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import CompanyTable from './CompanyTable'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCardTrainer'
import StatsExercise from '@src/views/ui-elements/cards/statistics/ChartjsDoughnutChart'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import ApexLineChart from '@src/views/charts/apex/ApexAreaCharts'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const TrainerDashboard = () => {
  const { colors } = useContext(ThemeColors)


  return (
    <div id='dashboard-trainer'>
      <Row className='match-height'>
        <Col lg='4' md='4' xs='12'>
          <Earnings success={colors.success.main} cols={{ xl: '3', sm: '6' }} />
        </Col>
        <Col xl='8' md='8' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='8'>
          <ApexLineChart />
        </Col>
        <Col lg='4' md='4' xs='4'>
          <StatsExercise warning={colors.warning.main} />
        </Col>
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

export default TrainerDashboard
