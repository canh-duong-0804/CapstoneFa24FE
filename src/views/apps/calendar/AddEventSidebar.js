import { Fragment, useState } from 'react'
import { X } from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import Select, { components } from 'react-select' // eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import makeAnimated from 'react-select/animated'
import api from '../../../api/index'

const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    store,
    dispatch,
    calendarApi,
    selectEvent,
    updateEvent,
    removeEvent,
    refetchEvents,
    calendarsColor,
    handleAddEventSidebar
  } = props

  const animatedComponents = makeAnimated()

  // ** Vars & Hooks
  const selectedEvent = store.selectedEvent,
    {
      control,
      setError,
      setValue,
      getValues,
      reset,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues: { listFoodIdBreakfasts: [] }
    })

  // ** States
  const [endPicker, setEndPicker] = useState(new Date())
  const [startPicker, setStartPicker] = useState(new Date())
  const [calendarLabel, setCalendarLabel] = useState([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
  const [optionFood, setOptionFood] = useState([])
  const [selectedFoods, setSelectedFoods] = useState([])

  // ** Select Options
  const options = [
    { value: 1, label: 'Bữa sáng', color: 'danger' },
    { value: 2, label: 'Bữa trưa', color: 'warning' },
    { value: 3, label: 'Bữa tối', color: 'success' },
    { value: 4, label: 'Bữa phụ', color: 'info' }
  ]

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    )
  }

  console.log('selectEvent', selectEvent)

  // ** Adds New Event
  const handleAddEvent = () => {
    const getMealType = (label) => {
      switch (label[0].value) {
        case 1: return 1
        case 2: return 2
        case 3: return 3
        case 4: return 4
        default: return 1
      }
    }
    const adjustedDate = new Date(startPicker)
    adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset())
   
    const obj = {
      mealType: getMealType(calendarLabel),
      selectDate: adjustedDate, 
      listFoodIdToAdd: selectedFoods.map(food => ({
        foodId: food.foodId,
        quantity: food.quantity
      }))
    }
  
    api.foodDairyApi.createFoodDairyApi(obj)
    .then(() => {
      // Gọi refetchEvents để load lại dữ liệu
      if (refetchEvents) {
        refetchEvents()
      }
      toast.success('Thêm món ăn thành công')

      // Reset form
      reset({
        listFoodIdToAdd: [],
        caloriesBreakfast: 0
      })
      setSelectedFoods([])
      setCalendarLabel([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
      setStartPicker(new Date())
      handleAddEventSidebar()
    })
    .catch((error) => {
      toast.error('Thêm món ăn thất bại')
      console.error('Error adding food:', error)
    })
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}))
    setCalendarLabel([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
    setStartPicker(new Date())
    setEndPicker(new Date())
    setSelectedFoods([])
  }
  const renderData = () => {
    api.foodApi.getListBoxFoodApi().then((rs) => {
      setOptionFood(rs)
    }).catch(() => {

    })
  }

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    renderData()
    if (!isObjEmpty(selectedEvent)) {
      const calendar = selectedEvent.extendedProps.calendar

      const resolveLabel = () => {
        if (calendar.length) {
          return { label: calendar, value: calendar, color: calendarsColor[calendar] }
        } else {
          return { value: 1, label: 'Bữa sáng', color: 'danger' }
        }
      }
      setStartPicker(new Date(selectedEvent.start))
      setEndPicker(selectedEvent.allDay ? new Date(selectedEvent.start) : new Date(selectedEvent.end))
      setCalendarLabel([resolveLabel()])
    }
  }

  const calculateTotalCalories = (foods) => {
    return foods.reduce((total, food) => {
      const foodOption = optionFood.find(opt => opt.value === food.foodId)
      return total + ((foodOption?.calories || 0) * food.quantity)
    }, 0)
  }

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id)

    // ** Set event properties except date related
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // ** dateRelatedProps => ['start', 'end', 'allDay']
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // ** Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(new Date(updatedEventData.start), new Date(updatedEventData.end), {
      allDay: updatedEventData.allDay
    })

    // ** Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }

  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    if (getValues('title').length) {
      const eventToUpdate = {
        id: selectedEvent.id,
        title: getValues('title'),
        allDay,
        start: startPicker,
        end: endPicker,
        url,
        display: allDay === false ? 'block' : undefined,
        extendedProps: {
          calendar: calendarLabel[0].label
        }
      }

      const propsToUpdate = ['id', 'title', 'url']
      const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']
      dispatch(updateEvent(eventToUpdate))
      updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)

      handleAddEventSidebar()
      toast.success('Event Updated')
    } else {
      setError('title', {
        type: 'manual'
      })
    }
  }

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = eventId => {
    calendarApi.getEventById(eventId).remove()
  }

  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedEvent.id))
    removeEventInCalendar(selectedEvent.id)
    handleAddEventSidebar()
    toast.error('Event Removed')
  }

  // ** Event Action buttons
  const EventActions = () => {
    if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button className='me-1' type='submit' color='primary'>
            Thêm
          </Button>
          <Button color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
            Hủy
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button className='me-1' color='primary' onClick={handleUpdateEvent}>
            Cập nhật
          </Button>
          <Button color='danger' onClick={handleDeleteEvent} outline>
            Xóa
          </Button>
        </Fragment>
      )
    }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      className='sidebar-lg'
      toggle={handleAddEventSidebar}
      onOpened={handleSelectedEvent}
      onClosed={handleResetInputValues}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedEvent && selectedEvent.title && selectedEvent.title.length ? 'Sửa' : 'Thêm'} Món ăn
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <Form
            onSubmit={handleSubmit(data => {
              if (isObjEmpty(errors)) {
                if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
                  handleAddEvent(data)
                } else {
                  handleUpdateEvent()
                }
              }
            })}
          >
            <div className='mb-1'>
              <Label className='form-label' for='add-listFoodIdToAdd'>
                Món ăn
              </Label>
              <Controller
                id='listFoodIdToAdd'
                name='listFoodIdToAdd'
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      theme={selectThemeColors}
                      closeMenuOnSelect={false}
                      className='react-select mb-2'
                      classNamePrefix='select'
                      isMulti
                      components={animatedComponents}
                      placeholder='Chọn món ăn...'
                      options={optionFood}
                      isClearable={false}
                      onChange={(selectedOptions) => {
                        const newFoods = selectedOptions ? selectedOptions.map(option => ({
                          foodId: option.value,
                          quantity: 0,
                          foodName: option.label
                        })) : []

                        setSelectedFoods(newFoods)
                        field.onChange(newFoods)
                        setValue('caloriesBreakfast', 0)
                      }}
                      value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                    />
                    {/* Danh sách món ăn đã chọn với input số lượng */}
                    <div className="selected-foods">
                      {selectedFoods.map((food, index) => (
                        <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                          <span className="flex-grow-1">{food.foodName}</span>
                          <Input
                            type="number"
                            className="w-25"
                            placeholder="Số lượng"
                            value={food.quantity}
                            min={0}
                            onChange={(e) => {
                              const newQuantity = parseFloat(e.target.value) || 0
                              const updatedFoods = selectedFoods.map((f, i) => (i === index ? { ...f, quantity: newQuantity } : f))
                              setSelectedFoods(updatedFoods)
                              field.onChange(updatedFoods)
                              setValue('caloriesBreakfast', calculateTotalCalories(updatedFoods))
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
              {errors.listFoodIdBreakfasts && (
                <FormFeedback>{errors.listFoodIdBreakfasts.message}</FormFeedback>
              )}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='add-calories'>
                Calories
              </Label>
              <Controller
                id='caloriesBreakfast'
                name='caloriesBreakfast'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    disabled
                    placeholder='0'
                    invalid={errors.caloriesBreakfast && true}
                  />
                )}
              />
              {errors.calories && <FormFeedback>{errors.calories.message}</FormFeedback>}
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='label'>
                Loại bữa
              </Label>
              <Select
                id='label'
                value={calendarLabel}
                options={options}
                theme={selectThemeColors}
                className='react-select'
                styles={{}}
                classNamePrefix='select'
                isClearable={false}
                onChange={data => setCalendarLabel([data])}
                components={{
                  Option: OptionComponent
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='selectDate'>
                Ngày
              </Label>
              <Flatpickr
                required
                id='selectDate'
                name='selectDate'
                className='form-control'
                onChange={date => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  dateFormat: 'd-m-Y'
                }}
              />
            </div>
            <div className='d-flex mb-1'>
              <EventActions />
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  )
}

export default AddEventSidebar
