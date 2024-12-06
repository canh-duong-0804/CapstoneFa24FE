// ** React Imports
import { Fragment } from 'react'
// ** Custom Components
// import classnames from 'classnames'
import { CardBody, Button, Input, Label } from 'reactstrap'
import illustration from '@src/assets/images/pages/calendar-illustration.png'

const SidebarLeft = props => {
  // ** Props
  const { handleAddEventSidebar, toggleSidebar} = props

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

  return (
    <Fragment>
      <div className='sidebar-wrapper'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
          <Button color='primary' block onClick={handleAddEventClick}>
            <span className='align-middle'>Thêm</span>
          </Button>
        </CardBody>
      </div>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
