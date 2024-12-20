import { Fragment, useContext, useState, useEffect } from 'react'
import { Row, Col, Modal, Button, ModalBody, Label, Form, Input } from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import { UserContext } from './useContext'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import api from '../../../../../api/index'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import makeAnimated from 'react-select/animated'
import ModalHeader from '../../../../../@core/components/modal-header'
import { notificationError, notificationSuccess } from '../../../../../utility/notification'
import { Tabs } from 'antd'

const initialItems = [
  {
    label: 'Ngày 1',
    key: '1',
    closable: false
  },
  {
    label: 'Ngày 2',
    key: '2',
    closable: false
  },
  {
    label: 'Ngày 3',
    key: '3',
    closable: false
  },
  {
    label: 'Ngày 4',
    key: '4',
    closable: false
  },
  {
    label: 'Ngày 5',
    key: '5',
    closable: false
  },
  {
    label: 'Ngày 6',
    key: '6',
    closable: false
  },
  {
    label: 'Ngày 7',
    key: '7',
    closable: false
  }
]

const defaultValues = {
  day: 1,
  listFoodIdBreakfasts: [],
  listFoodIdLunches: [],
  listFoodIdDinners: [],
  listFoodIdSnacks: [],
  caloriesBreakfast: 0,
  caloriesLunch: 0,
  caloriesDinner: 0,
  caloriesSnack: 0,
  descriptionBreakFast: '',
  descriptionLunch: '',
  descriptionDinner: '',
  descriptionSnack: '',
  selectedFoods: []
}

const ModalComponent = () => {

  const { openModalDetail,
    handleModalDetail,
    handleModal,
    setDataItem,
    typeModal,
    handleLoadTable,
    dataItem
  } = useContext(UserContext)
  const { t } = useTranslation()
  const animatedComponents = makeAnimated()

  const {
    control,
    // setError,
    // clearErrors,
    handleSubmit,
    setValue,
    watch,
    //getValues,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const [activeKey, setActiveKey] = useState(initialItems[0].key)
  const items = initialItems
  const [optionFood, setOptionFood] = useState([])
  const [data, setData] = useState(null)
  const [selectedFoods, setSelectedFoods] = useState([])
  const [selectedFoodLunch, setSelectedFoodLunch] = useState([])
  const [selectedFoodDinner, setSelectedFoodDinner] = useState([])
  const [selectedFoodSnack, setSelectedFoodSnack] = useState([])
  const [isDataChanged, setIsDataChanged] = useState(false)


  const loadTabData = (tabKey) => {
    const tabIndex = JSON.parse(tabKey)
    api.mealPlanTrainerApi.getMealPlanDetailApi(dataItem.mealPlanId, tabIndex)
      .then((rs) => {
        if (rs) {
          setData(rs)
          setSelectedFoods(rs.listFoodIdBreakfasts)
          setSelectedFoodLunch(rs.listFoodIdLunches) 
          setSelectedFoodDinner(rs.listFoodIdDinners)
          setSelectedFoodSnack(rs.listFoodIdSnacks)
          
          const calculateCalories = (foodListName, caloriesField) => {
            const value = rs[foodListName]
            if (Array.isArray(value)) {
              const selectedFoods = optionFood.filter(option => value.some(val => val.foodId === option.value))
              const totalCalories = selectedFoods.reduce((sum, option) => sum + option.calories, 0)
              setValue(caloriesField, totalCalories)
            }
          }

          Object.entries(rs).forEach(([name, value]) => {
            setValue(name, value)
            if (name === 'listFoodIdBreakfasts') {
              calculateCalories(name, 'caloriesBreakfast')
            }
            if (name === 'listFoodIdLunches') {
              calculateCalories(name, 'caloriesLunch')
            }
            if (name === 'listFoodIdDinners') {
              calculateCalories(name, 'caloriesDinner')
            }
            if (name === 'listFoodIdSnacks') {
              calculateCalories(name, 'caloriesSnack')
            }
          })
        }
        reset(rs)
        setIsDataChanged(false)
      })
      .catch(() => {
        reset(defaultValues)
      })
  }

  const listFoodIdBreakfasts = watch('listFoodIdBreakfasts')

  useEffect(() => {
    const newSelectedFoods = listFoodIdBreakfasts.map(food => ({
      foodId: food.foodId,
      quantity: food.quantity || 1, 
      foodName: food.foodName || '',
      portion: food.portion || ''
    }))

    if (JSON.stringify(newSelectedFoods) !== JSON.stringify(selectedFoods)) {
      setSelectedFoods(newSelectedFoods)
    }
  }, [listFoodIdBreakfasts])

  const listFoodIdLunches = watch('listFoodIdLunches')
  useEffect(() => {
    const newSelectedFoods = listFoodIdLunches.map(food => ({
      foodId: food.foodId,
      quantity: food.quantity || 1,
      foodName: food.foodName || '',
      portion: food.portion || ''
    }))
    if (JSON.stringify(newSelectedFoods) !== JSON.stringify(selectedFoodLunch)) {
      setSelectedFoodLunch(newSelectedFoods)
    }
  }, [listFoodIdLunches])

  const listFoodIdDinners = watch('listFoodIdDinners')
  useEffect(() => {
    const newSelectedFoods = listFoodIdDinners.map(food => ({
      foodId: food.foodId,
      quantity: food.quantity || 1,
      foodName: food.foodName || '',
      portion: food.portion || ''
    }))
    if (JSON.stringify(newSelectedFoods) !== JSON.stringify(selectedFoodDinner)) {
      setSelectedFoodDinner(newSelectedFoods)
    }
  }, [listFoodIdDinners])

  const listFoodIdSnacks = watch('listFoodIdSnacks')
  useEffect(() => {
    const newSelectedFoods = listFoodIdSnacks.map(food => ({
      foodId: food.foodId,
      quantity: food.quantity || 1,
      foodName: food.foodName || '',
      portion: food.portion || ''
    }))
    if (JSON.stringify(newSelectedFoods) !== JSON.stringify(selectedFoodSnack)) {
      setSelectedFoodSnack(newSelectedFoods)
    }
  }, [listFoodIdSnacks])

  const renderData = () => {
    api.foodApi.getListBoxFoodApi().then((rs) => {
      setOptionFood(rs)
    }).catch(() => {

    })
  }

  const handleFormOpened = () => {
    renderData()
    api.mealPlanTrainerApi.getMealPlanDetailApi(dataItem.mealPlanId, 1)
      .then((rs) => {
        if (rs) {
          console.log('rs', rs)
          setData(rs)
          setSelectedFoods(rs.listFoodIdBreakfasts)
          setSelectedFoodLunch(rs.listFoodIdLunches)
          setSelectedFoodDinner(rs.listFoodIdDinners)
          setSelectedFoodSnack(rs.listFoodIdSnacks)
          const calculateCalories = (foodListName, caloriesField) => {
            const value = rs[foodListName]
            if (Array.isArray(value)) {
              const selectedFoods = optionFood.filter(option => value.some(val => val.foodId === option.value))
              const totalCalories = selectedFoods.reduce((sum, option) => sum + option.calories, 0)
              setValue(caloriesField, totalCalories)
            }
          }

          Object.entries(rs).forEach(([name, value]) => {
            setValue(name, value)

            if (name === 'listFoodIdBreakfasts') {
              calculateCalories(name, 'caloriesBreakfast')
            }
            if (name === 'listFoodIdLunches') {
              calculateCalories(name, 'caloriesLunch')
            }
            if (name === 'listFoodIdDinners') {
              calculateCalories(name, 'caloriesDinner')
            }
            if (name === 'listFoodIdSnacks') {
              calculateCalories(name, 'caloriesSnack')
            }
          })
        }
      })
      .catch(() => {
        reset(defaultValues)
      })
  }

  const calculateTotalCalories = (foods) => {
    return foods.reduce((total, food) => {
      const foodOption = optionFood.find(opt => opt.value === food.foodId)
      return total + ((foodOption?.calories || 0) * food.quantity)
    }, 0)
  }

  useEffect(() => {
    if (data && optionFood?.length > 0) {
      const breakfastFoods = data.listFoodIdBreakfasts
      const lunchFoods = data.listFoodIdLunches
      const dinnerFoods = data.listFoodIdDinners
      const snackFoods = data.listFoodIdSnacks
      if (Array.isArray(breakfastFoods) || Array.isArray(lunchFoods) || Array.isArray(dinnerFoods) || Array.isArray(snackFoods)) {
        setValue('caloriesBreakfast', calculateTotalCalories(breakfastFoods))
        setValue('caloriesLunch', calculateTotalCalories(lunchFoods))
        setValue('caloriesDinner', calculateTotalCalories(dinnerFoods))
        setValue('caloriesSnack', calculateTotalCalories(snackFoods))
      }
    }
  }, [optionFood, data])

  const onSubmit = data => {
    const updatedData = {
      ...data,
      mealPlanId: dataItem.mealPlanId,
      day: JSON.parse(activeKey)
    }
    return api.mealPlanTrainerApi.createMealPlanDetailApi(updatedData)
      .then(() => {
        handleLoadTable()
        setIsDataChanged(false)
        notificationSuccess(t('Thêm kế hoạch thành công'))
      })
      .catch(() => {
        notificationError(t('Thêm kế hoạch thất bại'))
      })
  }

  const onChange = (newActiveKey) => {
    if (isDataChanged) {
      const confirmResult = window.confirm('Bạn có thay đổi chưa được lưu. Bạn có muốn lưu thay đổi không?')
      
      if (confirmResult) {
        handleSubmit(onSubmit)()
        .then(() => {
          setActiveKey(newActiveKey)
          loadTabData(newActiveKey)
        })
        return
      } else {
        reset(defaultValues)
        setIsDataChanged(false)
      }
    }
    
    setActiveKey(newActiveKey)
    loadTabData(newActiveKey)
  }

  const handleModalClosed = () => {
    setDataItem({})
    setActiveKey('1')
  }
  const handleCancel = () => {
    reset(defaultValues)
    handleModalDetail()
    setActiveKey('1')
    setDataItem({})
    setSelectedFoods([])
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color='primary' type='submit' className='me-1'>{t('Lưu')}</Button>
        <Button color='secondary' onClick={handleCancel} outline className='me-1'>{t('Hủy')}</Button>
      </Fragment>
    )
  }

  console.log('optionFood', optionFood)
  console.log('luch', selectedFoodLunch)

  // Thêm hàm getMaxQuantityForPortion
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

  return (
    <Fragment>
      <Modal
        isOpen={openModalDetail}
        toggle={handleModal}
        onClosed={handleModalClosed}
        onOpened={handleFormOpened}
        backdrop='static'
        className='modal-dialog-centered modal-xl'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title='Chi tiết kế hoạch bữa ăn' />
          <ModalBody>
            <Tabs
              onChange={onChange}
              activeKey={activeKey}
              items={items}
              type="card"
            />
            <div className='box form-box__border mb-2' style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '15px' }}>
              <h5 className='form-box__border--title' style={{ marginBottom: '15px', fontWeight: 'bold'}}>
                {'Bữa sáng'}
              </h5>
              <Row className="gy-1">
                <Col lg={9} md={9} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-listFoodIdBreakfasts'>
                      Món ăn
                    </Label>
                    <Controller
                      id='listFoodIdBreakfasts'
                      name='listFoodIdBreakfasts'
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
                              setIsDataChanged(true)
                            }}
                            value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                          />
                          {/* Danh sách món ăn đã chọn với input số lượng */}
                          <div className="selected-foods">
                            {selectedFoods.map((food, index) => {
                              // Tìm thông tin food option để lấy calories
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
                                            notificationError(`Số lượng cho ${food.foodName} phải từ 1 đến ${maxQuantityForPortion}`)
                                          }
                                        } else {
                                          notificationError('Không tìm thấy thông tin phần ăn')
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
                </Col>

                <Col lg={3} md={3} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-calories'>
                      Tổng Calories
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
                </Col>
              </Row>
            </div>
            <div className='box form-box__border mb-2' style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '15px' }}>
              <h5 className='form-box__border--title' style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                {'Bữa trưa'}
              </h5>
              <Row className="gy-1">
                <Col lg={9} md={9} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-listFoodIdLunches'>
                      Món ăn
                    </Label>
                    <Controller
                      id='listFoodIdLunches'
                      name='listFoodIdLunches'
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
                            
                              setSelectedFoodLunch(newFoods)
                              field.onChange(newFoods)
                              setValue('caloriesLunch', totalCalories)
                              setIsDataChanged(true)
                            }}
                            value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                          />
                          {/* Danh sách món ăn đã chọn với input số lượng */}
                          <div className="selected-foods">
                            {selectedFoodLunch.map((food, index) => {
                              // Tìm thông tin food option để lấy calories
                              const foodOption = optionFood.find(opt => opt.value === food.foodId)
                              const foodCalories = foodOption ? foodOption.calories : 0
                              const totalFoodCalories = foodCalories * food.quantity

                              return (
                                <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                                  <span className="flex-grow-1">{`${food.foodName} - ${food.portion}`}</span>
                                  <div className="d-flex flex-column me-2">
                                    {selectedFoodLunch.length > 0 && (
                                      <Label
                                        className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                        for={`lunch-quantity-${food.foodId}`}
                                      >
                                        Số lượng
                                      </Label>
                                    )}
                                    <Input
                                      id={`lunch-quantity-${food.foodId}`}
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
                                            const updatedFoods = selectedFoodLunch.map((f, i) => (i === index ? { ...f, quantity: newQuantity } : f))
                                            setSelectedFoodLunch(updatedFoods)
                                            field.onChange(updatedFoods)
                                            setValue('caloriesLunch', calculateTotalCalories(updatedFoods))
                                          } else {
                                            notificationError(`Số lượng cho ${food.foodName} phải từ 1 đến ${maxQuantityForPortion}`)
                                          }
                                        } else {
                                          notificationError('Không tìm thấy thông tin phần ăn')
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="d-flex flex-column">
                                    {selectedFoodLunch.length > 0 && (
                                      <Label
                                        className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                        for={`lunch-calories-${food.foodId}`}
                                      >
                                        Calories
                                      </Label>
                                    )}
                                    <Input
                                      id={`lunch-calories-${food.foodId}`}
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
                    {errors.listFoodIdLunches && (
                      <FormFeedback>{errors.listFoodIdLunches.message}</FormFeedback>
                    )}
                  </div>
                </Col>

                <Col lg={3} md={3} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-calories'>
                      Tổng Calories
                    </Label>
                    <Controller
                      id='caloriesLunch'
                      name='caloriesLunch'
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          disabled
                          placeholder='0'
                          invalid={errors.caloriesLunch && true}
                        />
                      )}
                    />
                    {errors.calories && <FormFeedback>{errors.calories.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
            </div>
            <div className='box form-box__border mb-2' style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '15px' }}>
              <h5 className='form-box__border--title' style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                {'Bữa tối'}
              </h5>
              <Row className="gy-1">
                <Col lg={9} md={9} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-listFoodIdDinners'>
                      Món ăn
                    </Label>
                    <Controller
                      id='listFoodIdDinners'
                      name='listFoodIdDinners'
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
                            
                              setSelectedFoodDinner(newFoods)
                              field.onChange(newFoods)
                              setValue('caloriesDinner', totalCalories)
                              setIsDataChanged(true)
                            }}
                            value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                          />
                          {/* Danh sách món ăn đã chọn với input số lượng */}
                          <div className="selected-foods">
                            {selectedFoodDinner.map((food, index) => {
                              // Tìm thông tin food option để lấy calories
                              const foodOption = optionFood.find(opt => opt.value === food.foodId)
                              const foodCalories = foodOption ? foodOption.calories : 0
                              const totalFoodCalories = foodCalories * food.quantity

                              return (
                                <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                                  <span className="flex-grow-1">{`${food.foodName} - ${food.portion}`}</span>
                                  <div className="d-flex flex-column me-2">
                                    {selectedFoodDinner.length > 0 && (
                                      <Label
                                        className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                        for={`dinner-quantity-${food.foodId}`}
                                      >
                                        Số lượng
                                      </Label>
                                    )}
                                    <Input
                                      id={`dinner-quantity-${food.foodId}`}
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
                                            const updatedFoods = selectedFoodDinner.map((f, i) => (i === index ? { ...f, quantity: newQuantity } : f))
                                            setSelectedFoodDinner(updatedFoods)
                                            field.onChange(updatedFoods)
                                            setValue('caloriesDinner', calculateTotalCalories(updatedFoods))
                                          } else {
                                            notificationError(`Số lượng cho ${food.foodName} phải từ 1 đến ${maxQuantityForPortion}`)
                                          }
                                        } else {
                                          notificationError('Không tìm thấy thông tin phần ăn')
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="d-flex flex-column">
                                    {selectedFoodDinner.length > 0 && (
                                      <Label
                                        className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                        for={`dinner-calories-${food.foodId}`}
                                      >
                                        Calories
                                      </Label>
                                    )}
                                    <Input
                                      id={`dinner-calories-${food.foodId}`}
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
                    {errors.listFoodIdDinners && (
                      <FormFeedback>{errors.listFoodIdDinners.message}</FormFeedback>
                    )}
                  </div>
                </Col>

                <Col lg={3} md={3} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-calories'>
                      Tổng Calories
                    </Label>
                    <Controller
                      id='caloriesDinner'
                      name='caloriesDinner'
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          disabled
                          placeholder='0'
                          invalid={errors.caloriesDinner && true}
                        />
                      )}
                    />
                    {errors.calories && <FormFeedback>{errors.calories.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
            </div>
            <div className='box form-box__border mb-2' style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '15px' }}>
              <h5 className='form-box__border--title' style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                {'Bữa nhẹ'}
              </h5>
              <Row className="gy-1">
                <Col lg={9} md={9} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-listFoodIdSnacks'>
                      Món ăn
                    </Label>
                    <Controller
                      id='listFoodIdSnacks'
                      name='listFoodIdSnacks'
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
                            
                              setSelectedFoodSnack(newFoods)
                              field.onChange(newFoods)
                              setValue('caloriesSnack', totalCalories)
                              setIsDataChanged(true)
                            }}
                            value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                          />
                          {/* Danh sách món ăn đã chọn với input số lượng */}
                          <div className="selected-foods">
                            {selectedFoodSnack.map((food, index) => {
                              // Tìm thông tin food option để lấy calories
                              const foodOption = optionFood.find(opt => opt.value === food.foodId)
                              const foodCalories = foodOption ? foodOption.calories : 0
                              const totalFoodCalories = foodCalories * food.quantity

                              return (
                                <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                                  <span className="flex-grow-1">{`${food.foodName} - ${food.portion}`}</span>
                                  <div className="d-flex flex-column me-2">
                                    {selectedFoodSnack.length > 0 && (
                                      <Label
                                        className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                        for={`snack-quantity-${food.foodId}`}
                                      >
                                        Số lượng
                                      </Label>
                                    )}
                                    <Input
                                      id={`snack-quantity-${food.foodId}`}
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
                                            const updatedFoods = selectedFoodSnack.map((f, i) => (i === index ? { ...f, quantity: newQuantity } : f))
                                            setSelectedFoodSnack(updatedFoods)
                                            field.onChange(updatedFoods)
                                            setValue('caloriesSnack', calculateTotalCalories(updatedFoods))
                                          } else {
                                            notificationError(`Số lượng cho ${food.foodName} phải từ 1 đến ${maxQuantityForPortion}`)
                                          }
                                        } else {
                                          notificationError('Không tìm thấy thông tin phần ăn')
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="d-flex flex-column">
                                    {selectedFoodSnack.length > 0 && (
                                      <Label
                                        className={`form-label ${food.quantity > 0 ? 'visible' : 'd-none'}`}
                                        for={`snack-calories-${food.foodId}`}
                                      >
                                        Calories
                                      </Label>
                                    )}
                                    <Input
                                      id={`snack-calories-${food.foodId}`}
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
                    {errors.listFoodIdSnacks && (
                      <FormFeedback>{errors.listFoodIdSnacks.message}</FormFeedback>
                    )}
                  </div>
                </Col>

                <Col lg={3} md={3} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-calories'>
                      Tổng Calories
                    </Label>
                    <Controller
                      id='caloriesSnack'
                      name='caloriesSnack'
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          disabled
                          placeholder='0'
                          invalid={errors.caloriesSnack && true}
                        />
                      )}
                    />
                    {errors.calories && <FormFeedback>{errors.calories.message}</FormFeedback>}
                  </div>
                </Col>
              </Row>
            </div>
          </ModalBody>
          <div
            className='d-flex justify-content-end p-1'
            style={{ boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}
          >
            {renderFooterButtons()}
          </div>
        </Form>
      </Modal>
    </Fragment >
  )
}

export default ModalComponent
