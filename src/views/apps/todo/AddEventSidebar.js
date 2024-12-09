import { Fragment, useState, useEffect } from 'react'
import { X } from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import Select, { components } from 'react-select' // eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form, Col, Row } from 'reactstrap'

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
    // calendarApi,
    selectEvent,
    // updateEvent,
    // removeEvent,
    refetchEvents,
    // calendarsColor,
    handleAddEventSidebar
  } = props

  const animatedComponents = makeAnimated()

  // ** Vars & Hooks
  const selectedEvent = store.selectedEvent,
    {
      control,
      setValue,
      reset,
      watch,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues: {
        listFoodIdToAdd: [], category: 1, intensity: 1
      }
    })

  // ** States
  const [startPicker, setStartPicker] = useState(new Date())
  const [calendarLabel, setCalendarLabel] = useState([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
  const [optionFood, setOptionFood] = useState([])
  const [selectedFoods, setSelectedFoods] = useState([])

  const optionCategory = [
    { value: 1, label: 'Cardio' },
    { value: 2, label: 'Kháng lực' },
    { value: 3, label: 'Khác' }

  ]

  const optionIntensity = [
    { value: 1, label: 'Cường độ nhẹ' },
    { value: 2, label: 'Cường độ vừa' },
    { value: 3, label: 'Cường độ cao' }

  ]

  useEffect(() => {
    if (open) {
      api.exerciseMemberApi.getAllExerciseFilterByCategoryApi(1).then((rs) => {
        const formattedOptions = rs.map(exercise => ({
          ...exercise,
          value: exercise.exerciseId,
          label: exercise.exerciseName,
          image: exercise.exerciseImage
        }))
        setOptionFood(formattedOptions)
      }).catch(() => {
        toast.error('Không thể tải dữ liệu bài tập')
      })
    }
  }, [open])

  useEffect(() => {
    api.exerciseMemberApi.getAllExerciseFilterByCategoryApi(watch('category')).then((rs) => {
      const formattedOptions = rs.map(exercise => ({
        ...exercise,
        value: exercise.exerciseId,
        label: exercise.exerciseName,
        image: exercise.exerciseImage
      }))
      setOptionFood(formattedOptions)
    }).catch(() => {
      toast.error('Không thể tải dữ liệu bài tập')
    })
  }, [watch('category')])

  console.log('optionFood', optionFood)


  // const formatDateToYYYYMMDD = (date) => {
  //   const year = date.getFullYear()
  //   const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  //   const day = String(date.getDate()).padStart(2, '0')
  //   return `${year}-${month}-${day}`
  // }


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
      selectDate: adjustedDate,
      listFoodIdToAdd: selectedFoods.map(rs => ({
        exerciseId: rs.exerciseId,
        isPractice: true
      }))
    }
    console.log('obj', obj)
    return

    api.exerciseDairyApi.createExerciseDairyApi(obj)
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
    setStartPicker(new Date())
  }
  const renderData = () => {
    // api.exerciseApi.getListboxExerciseApi().then((rs) => {
    //   setOptionFood(rs)
    // }).catch(() => {

    // })
  }

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    renderData()
    // if (!isObjEmpty(selectedEvent)) {
    //   const mealType = selectedEvent.extendedProps.calendar
    //   const selectedDate = new Date(selectedEvent.start)
    //   selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset())
    //   const formattedDate = formatDateToYYYYMMDD(selectedDate)
    //   setStartPicker(selectedDate)
    //   if (mealType) {
    //     api.foodApi.getListBoxFoodApi().then((foodOptions) => {
    //       setOptionFood(foodOptions)
    //       // Sau khi có optionFood, gọi API lấy chi tiết bữa ăn
    //       api.foodDairyApi.getFoodDairyDetailApi(formattedDate, mealType)
    //         .then((rs) => {
    //           if (rs && rs.listFoodIdToAdd) {
    //             // Transform foods bằng cách kết hợp data từ API với optionFood
    //             const transformedFoods = rs.listFoodIdToAdd.map(food => {
    //               const foodOption = foodOptions.find(opt => opt.value === food.exerciseId)
    //               return {
    //                 exerciseId: food.exerciseId,
    //                 quantity: food.quantity,
    //                 foodName: foodOption ? foodOption.label : `Food ${food.exerciseId}` // Fallback nếu không tìm thấy
    //               }
    //             })
    //             // Set giá trị vào form
    //             reset({
    //               listFoodIdToAdd: transformedFoods,
    //               caloriesBreakfast: calculateTotalCalories(transformedFoods)
    //             })
    //             // Set ngày được chọn
    //             setStartPicker(new Date(selectedEvent.start))
    //           }
    //         })
    //         .catch((error) => {
    //           toast.error('Không thể tải chi tiết bữa ăn')
    //           console.error('Error fetching food diary details:', error)
    //         })
    //     }).catch(() => {
    //       toast.error('Không thể tải danh sách món ăn')
    //     })
    //   } else {
    //     setCalendarLabel([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
    //     setStartPicker(new Date())
    //   }
    //   // Đảm bảo optionFood đã được load

    // }
  }

  // ** Updates Event in Store
  const handleUpdateEvent = () => {

    const obj = {
      mealType: getMealType(calendarLabel),
      selectDate: adjustedDate,
      listFoodIdToAdd: selectedFoods.map(food => ({
        exerciseId: food.exerciseId,
        quantity: food.quantity
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

  const listFoodIdBreakfasts = watch('listFoodIdToAdd')

  useEffect(() => {
    const newSelectedFoods = listFoodIdBreakfasts?.map(food => ({
      ...food,
      foodId: food.foodId,
      foodName: food.foodName || ''
    }))
    if (JSON.stringify(newSelectedFoods) !== JSON.stringify(selectedFoods)) {
      setSelectedFoods(newSelectedFoods)
    }
  }, [listFoodIdBreakfasts])

  console.log('list', selectedFoods)

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
        </Fragment>
      )
    }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  const CustomOption = ({ children, ...props }) => {
    return (
      <components.Option {...props}>
        <div className='d-flex align-items-center'>
          {props.data.image && (
            <img
              src={props.data.image}
              alt={props.data.label}
              style={{ width: '30px', height: '30px', marginRight: '10px', objectFit: 'cover' }}
            />
          )}
          {children}
        </div>
      </components.Option>
    )
  }

  // Thêm useEffect để theo dõi thay đổi category
  useEffect(() => {
    // Reset selectedFoods và form values khi category thay đổi
    setSelectedFoods([])
    reset({
      ...watch(),
      listFoodIdToAdd: []
    })
  }, [watch('category')])

  // Thêm hàm tính calories
  const calculateCalories = (minutes, metValue, weight) => {
    return Math.round((minutes * metValue * weight) / 200)
  }

  return (
    <Modal
      isOpen={open}
      className='modal-xl'
      toggle={handleAddEventSidebar}
      onOpened={handleSelectedEvent}
      onClosed={handleResetInputValues}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
      style={{ maxWidth: '800px', width: '100%' }}
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedEvent && selectedEvent.title && selectedEvent.title.length ? 'Sửa' : 'Thêm'} bài tập
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
              <Label className='form-label' for='add-category'>
                Thể loại bài tập
              </Label>
              <Controller
                id='category'
                name='category'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    placeholder='Chọn...'
                    options={optionCategory}
                    isClearable={false}
                    onChange={(option) => {
                      field.onChange(option ? option.value : '')
                      // Reset selectedFoods khi thay đổi category
                      setSelectedFoods([])
                    }}
                    value={optionCategory.find(option => option.value === field.value)}
                  />
                )}
              />
              {errors.category ? <FormFeedback>{errors.category.message}</FormFeedback> : null}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='add-intensity'>
                Cường độ luyện tập
              </Label>
              <Controller
                id='intensity'
                name='intensity'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    placeholder='Chọn...'
                    options={optionIntensity}
                    isClearable={false}
                    onChange={(option) => {
                      field.onChange(option ? option.value : '')
                    }}
                    value={optionIntensity.find(option => option.value === field.value)}
                  />
                )}
              />
              {errors.intensity ? <FormFeedback>{errors.intensity.message}</FormFeedback> : null}
            </div>
            
            <div className='mb-1'>
              <Label className='form-label' for='add-listFoodIdToAdd'>
                Bài tập
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
                      placeholder='Chọn bài tập...'
                      options={optionFood}
                      isClearable={false}
                      onChange={(selectedOptions) => {
                        const newFoods = selectedOptions ? selectedOptions.map(option => ({
                          ...option,
                          foodId: option.value,
                          foodName: option.label
                        })) : []
                        setSelectedFoods(newFoods)
                        field.onChange(newFoods)
                        
                      }}
                      value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                    />
                    {/* Danh sách bài tập đã chọn với input số lượng */}
                    <div className="selected-foods">
                      {selectedFoods.map((food, index) => {
                        const foodOption = optionFood.find(opt => opt.value === food.foodId)
                        const foodCalories = foodOption ? foodOption.calories : 0
                        const totalFoodCalories = foodCalories * food.quantity

                        return (
                          <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                            <span className="flex-grow-1">{`${food.foodName}`}</span>
                            {watch('category') === 1 && watch('intensity') === 1 && (
                              <>
                                <div className="d-flex flex-column me-2">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-quantity-${food.foodId}`}
                                  >
                                    Số phút
                                  </Label>
                                  <Input
                                    id={`breakfast-quantity-${food.foodId}`}
                                    type="number"
                                    className="w-100"
                                    value={food.minutesCadior1}
                                    min={0}
                                    onChange={(e) => {
                                      const newQuantity = parseFloat(e.target.value) || 0
                                      const foodOption = optionFood.find(opt => opt.value === food.foodId)
                                      const newCalories = calculateCalories(newQuantity, foodOption.metValue, foodOption.weight)
                                      
                                      const updatedFoods = selectedFoods.map((f, i) => {
                                        if (i === index) {
                                          return { 
                                            ...f, 
                                            minutesCadior1: newQuantity,
                                            caloriesCadior1: newCalories
                                          }
                                        }
                                        return f
                                      })
                                      setSelectedFoods(updatedFoods)
                                      field.onChange(updatedFoods)
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-calories-${food.foodId}`}
                                  >
                                    Calories
                                  </Label>
                                  <Input
                                    id={`breakfast-calories-${food.foodId}`}
                                    type="number" 
                                    className="w-100"
                                    placeholder="Calories"
                                    value={food.caloriesCadior1 || 0}
                                    disabled
                                  />
                                </div>
                              </>
                            )}

                            {watch('category') === 1 && watch('intensity') === 2 && (
                              <>
                                <div className="d-flex flex-column me-2">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-quantity-${food.foodId}`}
                                  >
                                    Số phút
                                  </Label>
                                  <Input
                                    id={`breakfast-quantity-${food.foodId}`}
                                    type="number"
                                    className="w-100"
                                    value={food.minutesCadior2}
                                    min={0}
                                    onChange={(e) => {
                                      const newQuantity = parseFloat(e.target.value) || 0
                                      const foodOption = optionFood.find(opt => opt.value === food.foodId)
                                      const newCalories = calculateCalories(newQuantity, foodOption.metValue, foodOption.weight)
                                      
                                      const updatedFoods = selectedFoods.map((f, i) => {
                                        if (i === index) {
                                          return { 
                                            ...f, 
                                            minutesCadior2: newQuantity,
                                            caloriesCadior2: newCalories
                                          }
                                        }
                                        return f
                                      })
                                      setSelectedFoods(updatedFoods)
                                      field.onChange(updatedFoods)
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-calories-${food.foodId}`}
                                  >
                                    Calories
                                  </Label>
                                  <Input
                                    id={`breakfast-calories-${food.foodId}`}
                                    type="number" 
                                    className="w-100"
                                    placeholder="Calories"
                                    value={food.caloriesCadior2 || 0}
                                    disabled
                                  />
                                </div>
                              </>
                            )}

                            {watch('category') === 1 && watch('intensity') === 3 && (
                              <>
                                <div className="d-flex flex-column me-2">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-quantity-${food.foodId}`}
                                  >
                                    Số phút
                                  </Label>
                                  <Input
                                    id={`breakfast-quantity-${food.foodId}`}
                                    type="number"
                                    className="w-100"
                                    value={food.minutesCadior3}
                                    min={0}
                                    onChange={(e) => {
                                      const newQuantity = parseFloat(e.target.value) || 0
                                      const foodOption = optionFood.find(opt => opt.value === food.foodId)
                                      const newCalories = calculateCalories(newQuantity, foodOption.metValue, foodOption.weight)
                                      
                                      const updatedFoods = selectedFoods.map((f, i) => {
                                        if (i === index) {
                                          return { 
                                            ...f, 
                                            minutesCadior3: newQuantity,
                                            caloriesCadior3: newCalories
                                          }
                                        }
                                        return f
                                      })
                                      setSelectedFoods(updatedFoods)
                                      field.onChange(updatedFoods)
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-calories-${food.foodId}`}
                                  >
                                    Calories
                                  </Label>
                                  <Input
                                    id={`breakfast-calories-${food.foodId}`}
                                    type="number" 
                                    className="w-100"
                                    placeholder="Calories"
                                    value={food.caloriesCadior3 || 0}
                                    disabled
                                  />
                                </div>
                              </>
                            )}

                            {watch('category') === 2 && (
                              <>
                                <div className="d-flex flex-column me-2">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-quantity-${food.foodId}`}
                                  >
                                    Sets
                                  </Label>
                                  <Input
                                    id={`breakfast-quantity-${food.foodId}`}
                                    type="number"
                                    className="w-100"
                                    placeholder="Số lượng"
                                    value={food.quantity}
                                    min={0}
                                    onChange={(e) => {
                                      const newQuantity = parseFloat(e.target.value) || 0
                                      const updatedFoods = selectedFoods.map((f, i) => {
                                        if (i === index) {
                                          return { ...f, quantity: newQuantity }
                                        }
                                        return f
                                      })
                                      setSelectedFoods(updatedFoods)
                                      field.onChange(updatedFoods)
                                      setValue('caloriesBreakfast', calculateTotalCalories(updatedFoods))
                                    }}
                                  />
                                </div>
                                <div className="d-flex flex-column">
                                  <Label
                                    className="form-label"
                                    for={`breakfast-calories-${food.foodId}`}
                                  >
                                    Phút
                                  </Label>
                                  <Input
                                    id={`breakfast-calories-${food.foodId}`}
                                    type="number" 
                                    className="w-100"
                                    placeholder="Calories"
                                    value={totalFoodCalories}
                                    disabled
                                  />
                                </div>
                              </>
                            )}

                          </div>
                        )
                      })}
                    </div>

                    {/* Thêm phần tổng thời gian và calories */}
                    <Row className='mb-1'>
                      <Col md='6'>
                        <div className='mb-1'>
                          <Label className='form-label' for='durationInMinutes'>
                            Tổng thời gian (phút)
                          </Label>
                          <Input
                            id='durationInMinutes'
                            type='number'
                            value={selectedFoods.reduce((total, food) => {
                              if (watch('category') === 1) {
                                if (watch('intensity') === 1) return total + (food.minutesCadior1 || 0)
                                if (watch('intensity') === 2) return total + (food.minutesCadior2 || 0)
                                if (watch('intensity') === 3) return total + (food.minutesCadior3 || 0)
                              } else {
                                return total + (food.quantity || 0)
                              }
                            }, 0)}
                            disabled
                          />
                        </div>
                      </Col>
                      <Col md='6'>
                        <div className='mb-1'>
                          <Label className='form-label' for='caloriesBurned'>
                            Tổng Calories
                          </Label>
                          <Input
                            id='caloriesBurned'
                            type='number'
                            value={selectedFoods.reduce((total, food) => {
                              if (watch('category') === 1) {
                                if (watch('intensity') === 1) return total + (food.caloriesCadior1 || 0)
                                if (watch('intensity') === 2) return total + (food.caloriesCadior2 || 0)
                                if (watch('intensity') === 3) return total + (food.caloriesCadior3 || 0)
                              } else {
                                const foodOption = optionFood.find(opt => opt.value === food.foodId)
                                return total + ((foodOption?.calories || 0) * (food.quantity || 0))
                              }
                            }, 0)}
                            disabled
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              />
              {errors.listFoodIdBreakfasts && (
                <FormFeedback>{errors.listFoodIdBreakfasts.message}</FormFeedback>
              )}
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
