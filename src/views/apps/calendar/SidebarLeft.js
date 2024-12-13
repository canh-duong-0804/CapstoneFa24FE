import { Fragment } from 'react'


import { CardBody, Button, Input, Label } from 'reactstrap'

import illustration from '@src/assets/images/pages/calendar-illustration.png'

// ** Filters Checkbox Array
// const filters = [
//   { label: 'Bữa sáng', color: 'danger', className: 'form-check-danger mb-1' },
//   { label: 'Bữa trưa', color: 'warning', className: 'form-check-warning mb-1' },
//   { label: 'Bữa tối', color: 'success', className: 'form-check-success mb-1' },
//   { label: 'Bữa phụ', color: 'info', className: 'form-check-info mb-1' }

// ]

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
        {/* <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Lọc</span>
          </h5>
          <div className='form-check mb-1'>
            <Input
              id='view-all'
              type='checkbox'
              label='View All'
              className='select-all'
              checked={store.selectedCalendars.length === filters.length}
              onChange={e => dispatch(updateAllFilters(e.target.checked))}
            />
            <Label className='form-check-label' for='view-all'>
              Tất cả
            </Label>
          </div>
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <div
                    key={`${filter.label}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type='checkbox'
                      key={filter.label}
                      label={filter.label}
                      className='input-filter'
                      id={`${filter.label}-event`}
                      checked={store.selectedCalendars.includes(filter.label)}
                      onChange={() => {
                        dispatch(updateFilter(filter.label))
                      }}
                    />
                    <Label className='form-check-label' for={`${filter.label}-event`}>
                      {filter.label}
                    </Label>
                  </div>
                )
              })}
          </div>
        </CardBody> */}
      </div>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
