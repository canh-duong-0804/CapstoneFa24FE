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
    selectEvent,
    refetchEvents,
    handleAddEventSidebar
  } = props

  const animatedComponents = makeAnimated()

  // ** Vars & Hooks
  const selectedEvent = store.selectedEvent
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { listFoodIdBreakfasts: [] }
  })

  // ** States
  const [startPicker, setStartPicker] = useState(selectedEvent?.start || new Date())
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

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const calculateTotalCalories = (foods) => {
    return foods.reduce((total, food) => {
      const foodOption = optionFood.find(opt => opt.value === food.foodId)
      return total + ((foodOption?.calories || 0) * food.quantity)
    }, 0)
  }

  const adjustedDate = new Date(startPicker)
  adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset())

  const getMealType = (label) => {
    switch (label[0].value) {
      case 1: return 1
      case 2: return 2
      case 3: return 3
      case 4: return 4
      default: return 1
    }
  }

  // ** Adds New Event
  const handleAddEvent = () => {
    const obj = {
      mealType: getMealType(calendarLabel),
      selectDate: adjustedDate,
      listFoodIdToAdd: selectedFoods.map(food => ({
        foodId: food.foodId,
        quantity: food.quantity,
        portion: food.portion
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
    reset({
      listFoodIdToAdd: [],
      caloriesBreakfast: 0
    })
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
      const mealType = selectedEvent.extendedProps.calendar
      const selectedDate = new Date(selectedEvent.start)
      selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset())
      const formattedDate = formatDateToYYYYMMDD(selectedDate)

      setStartPicker(selectedDate)

      if (mealType) {
        api.foodApi.getListBoxFoodApi().then((foodOptions) => {
          setOptionFood(foodOptions)
          // Sau khi có optionFood, gọi API lấy chi tiết bữa ăn
          api.foodDairyApi.getFoodDairyDetailApi(formattedDate, mealType)
            .then((rs) => {
              if (rs && rs.listFoodIdToAdd) {
                // Transform foods bằng cách kết hợp data từ API với optionFood
                const transformedFoods = rs.listFoodIdToAdd.map(food => {
                  const foodOption = foodOptions.find(opt => opt.value === food.foodId)
                  console.log('foodOption', foodOption)
                  return {
                    foodId: food.foodId,
                    quantity: food.quantity,
                    foodName: foodOption ? foodOption.label : `Food ${food.foodId}`,
                    portion: food.portion // Fallback nếu không tìm thấy
                  }
                })
                setSelectedFoods(transformedFoods)
                // Set giá trị vào form
                reset({
                  listFoodIdToAdd: transformedFoods,
                  caloriesBreakfast: calculateTotalCalories(transformedFoods)
                })

                // Set calendar label dựa vào mealType
                const mealTypeLabel = options.find(opt => opt.value === mealType)
                if (mealTypeLabel) {
                  setCalendarLabel([mealTypeLabel])
                }
                // Set ngày được chọn
                setStartPicker(new Date(selectedEvent.start))
              }
            })
            .catch((error) => {
              toast.error('Không thể tải chi tiết bữa ăn')
              console.error('Error fetching food diary details:', error)
            })
        }).catch(() => {
          toast.error('Không thể tải danh sách món ăn')
        })
      } else {
        setCalendarLabel([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
        setSelectedFoods([])
      }
      // Đảm bảo optionFood đã được load

    }
  }

  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    const obj = {
      mealType: getMealType(calendarLabel),
      selectDate: adjustedDate,
      listFoodIdToAdd: selectedFoods.map(food => ({
        foodId: food.foodId,
        quantity: food.quantity,
        portion: food.portion
      }))
    }

    api.foodDairyApi.createFoodDairyApi(obj)
      .then(() => {
        // Gọi refetchEvents để load lại dữ liệu
        if (refetchEvents) {
          refetchEvents()
        }
        toast.success('Sửa món ăn thành công')

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

  const handleDeleteEvent = () => {
    const mealType = selectedEvent.extendedProps.calendar
    const selectedDate = new Date(selectedEvent.start)
    selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset())
    const formattedDate = formatDateToYYYYMMDD(selectedDate)
    api.foodDairyApi.deleteFoodDairyByIdApi(formattedDate, mealType).then(() => {
      if (refetchEvents) {
        refetchEvents()
      }
      reset({
        listFoodIdToAdd: [],
        caloriesBreakfast: 0
      })
      setSelectedFoods([])
      setCalendarLabel([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
      setStartPicker(new Date())
      handleAddEventSidebar()
      toast.success('Xóa bữa ăn thành công')
    }).catch(() => {
      toast.error('Xóa bữa ăn thất bại')
    })


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

  console.log('food', optionFood)

  const getMaxQuantityForPortion = (portion) => {
    switch (portion.toLowerCase()) {
      case '1 bát':
        return 5
      case '1 tô':
        return 5
      case '1 đĩa':
        return 5
      case '1 phần':
        return 4
      case '1 khay':
        return 4
      case '1 chén':
        return 5
      case '1 ly':
        return 4
      case '1 cốc':
        return 3
      case '1 tách':
        return 3
      case '1 chai':
        return 5
      case '1 lon':
        return 4
      case '1 bình':
        return 3
      case '1 quả':
        return 20
      case '1 miếng':
        return 7
      case '1 múi':
        return 20
      case '1 nải':
        return 2
      case '1 chùm':
        return 3
      case '1 trái':
        return 20
      default:
        return 10
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
                          quantity: 1, // Mặc định số lượng là 1
                          foodName: `${option.label}`,
                          portion: option.portion
                        })) : []

                        // Tính tổng calories ngay khi chọn
                        const totalCalories = newFoods.reduce((total, food) => {
                          const foodOption = optionFood.find(opt => opt.value === food.foodId)
                          return total + (foodOption ? foodOption.calories * food.quantity : 0)
                        }, 0)

                        setSelectedFoods(newFoods)
                        field.onChange(newFoods)
                        setValue('caloriesBreakfast', totalCalories)
                      }}
                      value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                    />
                    {/* Danh sách món ăn đã chọn với input số lượng */}
                    <div className="selected-foods">
                      {selectedFoods.map((food, index) => {
                        const foodOption = optionFood.find(opt => opt.value === food.foodId)
                        const foodCalories = foodOption ? foodOption.calories : 0
                        const totalFoodCalories = foodCalories * food.quantity

                        return (
                          <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                            <span className="flex-grow-1">{`${food.foodName} - ${food.portion}`}</span>
                            <div className="d-flex flex-column me-2">
                              {selectedFoods.length > 0 && (
                                <Label
                                  className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                  for={`breakfast-quantity-${food.foodId}`}
                                >
                                  Số lượng
                                </Label>
                              )}
                              <Input
                                id={`breakfast-quantity-${food.foodId}`}
                                type="number"
                                className="w-100"
                                placeholder="Số lượng"
                                min="1"
                                value={food.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseFloat(e.target.value) || 0
                                  const foodOption = optionFood.find(opt => opt.value === food.foodId)
                                  if (foodOption && foodOption.serving) {
                                    const maxQuantityForPortion = getMaxQuantityForPortion(foodOption.serving)

                                    if (newQuantity >= 1 && newQuantity <= maxQuantityForPortion) {
                                      const updatedFoods = selectedFoods.map((f, i) => (i === index ? { ...f, quantity: newQuantity } : f))
                                      setSelectedFoods(updatedFoods)
                                      field.onChange(updatedFoods)
                                      setValue('caloriesBreakfast', calculateTotalCalories(updatedFoods))
                                    } else {
                                      toast.error(`Số lượng cho ${food.foodName} phải từ 1 đến ${maxQuantityForPortion}`)
                                    }
                                  } else {
                                    toast.error('Không tìm thấy thông tin phần ăn')
                                  }
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column">
                              {selectedFoods.length > 0 && (
                                <Label
                                  className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                  for={`breakfast-calories-${food.foodId}`}
                                >
                                  Calories
                                </Label>
                              )}
                              <Input
                                id={`breakfast-calories-${food.foodId}`}
                                type="number"
                                className="w-100"
                                placeholder="Calories"
                                value={totalFoodCalories}
                                disabled
                              />
                            </div>
                          </div>
                        )
                      })}
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
                Tổng calories bữa ăn
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
