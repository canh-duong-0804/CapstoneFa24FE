import { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import CompanyTable from './CompanyTable'
import ExerciseTable from './ExerciseTable'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCardTrainer'
import ApexLineChart from '@src/views/charts/apex/ApexAreaCharts'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const TrainerDashboard = () => {
  const { colors } = useContext(ThemeColors)


  return (
    <div id='dashboard-trainer'>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
      <Col lg='4' md='4' xs='12'>
          <Earnings success={colors.success.main} cols={{ xl: '3', sm: '6' }} />
        </Col>
        <Col lg='8' xs='8'>
          <CompanyTable />
        </Col>
        <Col lg='12' xs='12'>
          <ExerciseTable />
        </Col>
      </Row>
    </div>
  )
}

export default TrainerDashboard
