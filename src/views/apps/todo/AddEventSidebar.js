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
      // setValue,
      reset,
      watch,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues: {
        listFoodIdBreakfasts: [], category: 1
      }
    })

  // ** States
  const [startPicker, setStartPicker] = useState(new Date())
  const [calendarLabel, setCalendarLabel] = useState([{ value: 1, label: 'Bữa sáng', color: 'danger' }])
  const [optionFood, setOptionFood] = useState([])
  const [calories2Value, setCalories2Value] = useState('')
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
      api.exerciseMemberApi.getAllExerciseByCategoryApi(1).then((rs) => {
        const formattedOptions = rs.map(exercise => ({
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
    if (watch('category') !== 1) {
      api.exerciseMemberApi.getAllExerciseByCategoryApi(watch('category')).then((rs) => {
        const formattedOptions = rs.map(exercise => ({
          value: exercise.exerciseId,
          label: exercise.exerciseName,
          image: exercise.exerciseImage
        }))
        setOptionFood(formattedOptions)
      }).catch(() => {
        toast.error('Không thể tải dữ liệu bài tập')
      })
    }
  }, [watch('category')])

  const handleChangeCalories2 = (e) => {
    setCalories2Value(e.target.value)
  }

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const calculateTotalCalories = (foods) => {
    return foods.reduce((total, food) => {
      const foodOption = optionFood.find(opt => opt.value === food.exerciseId)
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
      selectDate: adjustedDate,
      listFoodIdToAdd: optionFood.map(rs => ({
        exerciseId: rs.exerciseId,
        quantity: rs.quantity
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
    if (!isObjEmpty(selectedEvent)) {
      const mealType = selectedEvent.extendedProps.calendar
      const selectedDate = new Date(selectedEvent.start)
      selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset())
      const formattedDate = formatDateToYYYYMMDD(selectedDate)
      if (mealType) {
        api.foodApi.getListBoxFoodApi().then((foodOptions) => {
          setOptionFood(foodOptions)
          // Sau khi có optionFood, gọi API lấy chi tiết bữa ăn
          api.foodDairyApi.getFoodDairyDetailApi(formattedDate, mealType)
            .then((rs) => {
              if (rs && rs.listFoodIdToAdd) {
                // Transform foods bằng cách kết hợp data từ API với optionFood
                const transformedFoods = rs.listFoodIdToAdd.map(food => {
                  const foodOption = foodOptions.find(opt => opt.value === food.exerciseId)
                  return {
                    exerciseId: food.exerciseId,
                    quantity: food.quantity,
                    foodName: foodOption ? foodOption.label : `Food ${food.exerciseId}` // Fallback nếu không tìm thấy
                  }
                })
                // Set giá trị vào form
                reset({
                  listFoodIdToAdd: transformedFoods,
                  caloriesBreakfast: calculateTotalCalories(transformedFoods)
                })
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
        setStartPicker(new Date())
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
      foodId: food.foodId,
      quantity: food.quantity || 1,
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
                      components={{
                        ...animatedComponents,
                        Option: CustomOption
                      }}
                      placeholder='Chọn bài tập...'
                      options={optionFood}
                      isClearable={false}
                      onChange={(selectedOptions) => {
                        const newFoods = selectedOptions ? selectedOptions.map(option => ({
                          exerciseId: option.value,
                          quantity: 0,
                          foodName: option.label
                        })) : []
                        field.onChange(newFoods)
                      }}
                      value={optionFood.filter(option => field.value?.some(val => val.exerciseId === option.value))}
                    />
                  </div>
                )}
              />
              {errors.listFoodIdBreakfasts && (
                <FormFeedback>{errors.listFoodIdBreakfasts.message}</FormFeedback>
              )}
            </div>
            {watch('category') !== 3 && (
              <div className='mb-1'>
                <Label className='form-label' for='add-intensity'>
                  Cường độ
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
            )}
            <div className="selected-foods">
              {selectedFoods?.map((food) => {
                return (
                  <div key={food.exerciseId} className="d-flex align-items-center gap-2 mb-2">
                    <span className="flex-grow-1">{food.foodName}</span>
                    {watch('category') === 1 && (
                      <><div className="d-flex flex-column me-2">
                        {selectedFoods.length > 0 && (
                          <Label
                            className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                            for={`breakfast-quantity-${food.exerciseId}`}
                          >
                            Phút
                          </Label>
                        )}
                        <Controller
                          id='minutes2'
                          name='minutes2'
                          control={control}
                          render={({ field }) => (
                            <Input
                              autoFocus
                              invalid={errors.minutes2 && true}
                              {...field}
                            />
                          )}
                        />
                      </div>
                        <div className="d-flex flex-column">
                          {selectedFoods.length > 0 && (
                            <Label
                              className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                              for={`breakfast-calories-${food.exerciseId}`}
                            >
                              Calo
                            </Label>
                          )}
                          <Controller
                            id='calories2'
                            name='calories2'
                            control={control}
                            render={({ field }) => (
                              <Input
                                autoFocus
                                type='number'
                                invalid={errors.calories2 && true}
                                value={calories2Value}
                                disabled
                                onChange={(e) => {
                                  handleChangeCalories2(e)
                                  field.onChange(e)
                                }}
                              />
                            )}
                          />
                        </div></>

                    )}
                     {watch('category') === 2 && (
                      <><div className="d-flex flex-column me-2">
                        {selectedFoods.length > 0 && (
                          <Label
                            className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                            for={`breakfast-quantity-${food.exerciseId}`}
                          >
                            Reps
                          </Label>
                        )}
                        <Controller
                          id='reps'
                          name='minutes2'
                          control={control}
                          render={({ field }) => (
                            <Input
                              autoFocus
                              invalid={errors.minutes2 && true}
                              {...field}
                            />
                          )}
                        />
                      </div>
                        <div className="d-flex flex-column">
                          {selectedFoods.length > 0 && (
                            <Label
                              className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                              for={`breakfast-calories-${food.exerciseId}`}
                            >
                              Sets
                            </Label>
                          )}
                          <Controller
                            id='sets'
                            name='sets'
                            control={control}
                            render={({ field }) => (
                              <Input
                                autoFocus
                                type='number'
                                invalid={errors.calories2 && true}
                                value={calories2Value}
                                disabled
                                onChange={(e) => {
                                  handleChangeCalories2(e)
                                  field.onChange(e)
                                }}
                              />
                            )}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          {selectedFoods.length > 0 && (
                            <Label
                              className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                              for={`breakfast-calories-${food.exerciseId}`}
                            >
                              Phút
                            </Label>
                          )}
                          <Controller
                            id='minutes'
                            name='minutes'
                            control={control}
                            render={({ field }) => (
                              <Input
                                autoFocus
                                type='number'
                                invalid={errors.calories2 && true}
                                value={calories2Value}
                                disabled
                                onChange={(e) => {
                                  handleChangeCalories2(e)
                                  field.onChange(e)
                                }}
                              />
                            )}
                          />
                        </div></>

                    )}
                  </div>
                )
              })}
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
