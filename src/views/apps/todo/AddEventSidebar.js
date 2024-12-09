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
        listExerciseIdToAdd: [], category: 1, intensity: 1
      }
    })

  // ** States
  const [startPicker, setStartPicker] = useState(
    selectedEvent && selectedEvent.selectedDate ? new Date(selectedEvent.selectedDate) : new Date()
  )
  
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
      toast.error('Không thể tải dữ liệu bài tập cc')
    })
  }, [watch('category')])

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }


  const adjustedDate = new Date(startPicker)
  adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset())

  // ** Adds New Event
  const handleAddEvent = () => {
    const obj = {
      selectDate: adjustedDate,
      listExerciseIdToAdd: selectedFoods.map(exercise => {
        let durationInMinutes = 0
        let caloriesBurned = 0
        if (watch('category') === 1) { // Cardio
          switch (watch('intensity')) {
            case 1: // Cường độ nhẹ
              durationInMinutes = exercise.minutesCadior1 || 0
              caloriesBurned = exercise.caloriesCadior1 || 0
              break
            case 2: // Cường độ vừa  
              durationInMinutes = exercise.minutesCadior2 || 0
              caloriesBurned = exercise.caloriesCadior2 || 0
              break
            case 3: // Cường độ cao
              durationInMinutes = exercise.minutesCadior3 || 0
              caloriesBurned = exercise.caloriesCadior3 || 0
              break
            default:
              break
          }
        } else { // Kháng lực hoặc khác
          durationInMinutes = exercise.quantity || 0
          const exerciseOption = optionFood.find(opt => opt.value === exercise.exerciseId)
          caloriesBurned = (exerciseOption?.calories || 0) * (exercise.quantity || 0)
        }

        return {
          exerciseId: exercise.exerciseId,
          durationInMinutes,
          isPractice: true,
          caloriesBurned
        }
      })
    }

    api.exerciseDairyApi.createExerciseDairyApi(obj)
      .then(() => {
        if (refetchEvents) {
          refetchEvents()
        }
        toast.success('Thêm bài tập thành công')

        // Reset form
        reset({
          listExerciseIdToAdd: [],
          category: 1,
          intensity: 1
        })
        setSelectedFoods([])
        setStartPicker(new Date())
        handleAddEventSidebar()
      })
      .catch((error) => {
        toast.error('Thêm bài tập thất bại')
        console.error('Error adding exercise:', error)
      })
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}))
    reset({
      listExerciseIdToAdd: [],
      caloriesBreakfast: 0
    })
  }
  
  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      const selectedDate = new Date(selectedEvent.start)
      selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset())
      const formattedDate = formatDateToYYYYMMDD(selectedDate)
      setStartPicker(selectedDate)

      // Lấy chi tiết nhật ký tập luyện trước
      api.exerciseDairyApi.getExerciseDairyDetailApi(formattedDate)
        .then((diaryDetail) => {
          if (diaryDetail && diaryDetail.listExerciseIdToAdd) {
            // Lấy danh sách bài tập theo category hiện tại
            api.exerciseMemberApi.getAllExerciseFilterByCategoryApi(watch('category'))
              .then((exercises) => {
                const formattedOptions = exercises.map(exercise => ({
                  ...exercise,
                  value: exercise.exerciseId,
                  label: exercise.exerciseName,
                  image: exercise.exerciseImage
                }))
                setOptionFood(formattedOptions)

                // Kết hợp thông tin từ API với danh sách bài tập
                const transformedExercises = diaryDetail.listExerciseIdToAdd.map(exercise => {
                  const exerciseDetail = formattedOptions.find(opt => opt.value === exercise.exerciseId)
                  if (exerciseDetail) {
                    return {
                      ...exerciseDetail,
                      exerciseId: exercise.exerciseId,
                      value: exercise.exerciseId,
                      label: exerciseDetail.exerciseName,
                      exerciseName: exerciseDetail.exerciseName,
                      // Nếu là bài tập Cardio
                      minutesCadior1: watch('category') === 1 && watch('intensity') === 1 ? exercise.durationInMinutes : undefined,
                      minutesCadior2: watch('category') === 1 && watch('intensity') === 2 ? exercise.durationInMinutes : undefined,
                      minutesCadior3: watch('category') === 1 && watch('intensity') === 3 ? exercise.durationInMinutes : undefined,
                      caloriesCadior1: watch('category') === 1 && watch('intensity') === 1 ? exercise.caloriesBurned : undefined,
                      caloriesCadior2: watch('category') === 1 && watch('intensity') === 2 ? exercise.caloriesBurned : undefined,
                      caloriesCadior3: watch('category') === 1 && watch('intensity') === 3 ? exercise.caloriesBurned : undefined,
                      // Nếu là bài tập khác
                      quantity: watch('category') !== 1 ? exercise.durationInMinutes : undefined
                    }
                  }
                  return null
                }).filter(Boolean)

                // Cập nhật form và state
                setSelectedFoods(transformedExercises)
                reset({
                  category: watch('category'),
                  intensity: watch('intensity'),
                  listExerciseIdToAdd: transformedExercises
                })
              })
              .catch(() => {
                toast.error('Không thể tải danh sách bài tập')
              })
          }
        })
        .catch(() => {
          toast.error('Không thể tải chi tiết bài tập')
        })
    }
  }

  // ** Updates Event in Store
  const handleUpdateEvent = () => {

    const obj = {
      selectDate: adjustedDate,
      listExerciseIdToAdd: selectedFoods.map(exercise => {
        let durationInMinutes = 0
        let caloriesBurned = 0
        if (watch('category') === 1) { // Cardio
          switch (watch('intensity')) {
            case 1: // Cường độ nhẹ
              durationInMinutes = exercise.minutesCadior1 || 0
              caloriesBurned = exercise.caloriesCadior1 || 0
              break
            case 2: // Cường độ vừa  
              durationInMinutes = exercise.minutesCadior2 || 0
              caloriesBurned = exercise.caloriesCadior2 || 0
              break
            case 3: // Cường độ cao
              durationInMinutes = exercise.minutesCadior3 || 0
              caloriesBurned = exercise.caloriesCadior3 || 0
              break
            default:
              break
          }
        } else { // Kháng lực hoặc khác
          durationInMinutes = exercise.quantity || 0
          const exerciseOption = optionFood.find(opt => opt.value === exercise.exerciseId)
          caloriesBurned = (exerciseOption?.calories || 0) * (exercise.quantity || 0)
        }

        return {
          exerciseId: exercise.exerciseId,
          durationInMinutes,
          isPractice: true,
          caloriesBurned
        }
      })
    }

    api.exerciseDairyApi.createExerciseDairyApi(obj)
      .then(() => {
        if (refetchEvents) {
          refetchEvents()
        }
        toast.success('Sửa bài tập thành công')

        // Reset form
        reset({
          listExerciseIdToAdd: [],
          category: 1,
          intensity: 1
        })
        setSelectedFoods([])
        setStartPicker(new Date())
        handleAddEventSidebar()
      })
      .catch(() => {
        toast.error('Sửa bài tập thất bại')
      })
  }

  const listFoodIdBreakfasts = watch('listExerciseIdToAdd')

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
      listExerciseIdToAdd: []
    })
  }, [watch('category')])

  // Thêm hàm tính calories
  const calculateCalories = (minutes, metValue, weight) => {
    return Math.round((minutes * metValue * weight) / 200)
  }

  useEffect(() => {
    if (selectedEvent && selectedEvent.selectedDate) {
      setStartPicker(new Date(selectedEvent.selectedDate))
    }
  }, [selectedEvent])

  console.log('selectFood', selectedFoods)

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
              <Label className='form-label' for='add-listExerciseIdToAdd'>
                Bài tập
              </Label>
              <Controller
                id='listExerciseIdToAdd'
                name='listExerciseIdToAdd'
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
                      components={{ Option: CustomOption, ...animatedComponents }}
                      placeholder='Chọn bài tập...'
                      options={optionFood}
                      isClearable={false}
                      onChange={(selectedOptions) => {
                        const newFoods = selectedOptions ? selectedOptions.map(option => ({
                          ...option,
                          exerciseId: option.value,
                          exerciseName: option.label,
                          // Giữ lại các giá trị hiện có nếu bài tập đã tồn tại trong selectedFoods
                          ...selectedFoods.find(food => food.exerciseId === option.value)
                        })) : []
                        setSelectedFoods(newFoods)
                        field.onChange(newFoods)
                      }}
                      value={selectedFoods.map(food => ({
                        value: food.exerciseId,
                        label: food.exerciseName || food.label,
                        image: food.image
                      }))}
                    />
                    {/* Danh sách bài tập đã chọn với input số lượng */}
                    <div className="selected-foods">
                      {selectedFoods.map((food, index) => {
                        const foodOption = optionFood.find(opt => opt.value === food.foodId)
                        const foodCalories = foodOption ? foodOption.calories : 0
                        const totalFoodCalories = foodCalories * food.quantity

                        return (
                          <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                            <span className="flex-grow-1">{`${food.exerciseName}`}</span>
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
