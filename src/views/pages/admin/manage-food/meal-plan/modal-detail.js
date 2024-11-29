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
  descriptionSnack: ''
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
    // watch,
    //getValues,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const [activeKey, setActiveKey] = useState(initialItems[0].key)
  const [items, setItems] = useState(initialItems)
  const [optionFood, setOptionFood] = useState([])
  const [data, setData] = useState(null)
  const [selectedFoods, setSelectedFoods] = useState([])

  const onChange = (newActiveKey) => {
    const index = items.findIndex(item => item.key === newActiveKey)
    console.log('Tab index:', index + 1)
    setActiveKey(newActiveKey)
    const tabIndex = JSON.parse(newActiveKey)

    api.mealPlanTrainerApi.getMealPlanDetailApi(dataItem.mealPlanId, tabIndex)
      .then((rs) => {
        console.log('rs', rs)
        if (rs) {
          setData(rs)
          setSelectedFoods(rs.listFoodIdBreakfasts)
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
      })
      .catch(() => {
        reset(defaultValues)
      })
  }

  const add = () => {
    const newTabNumber = items.length + 1
    const newActiveKey = `newTab${newTabNumber}`
    const newPanes = [...items]
    newPanes.push({
      label: `Ngày ${newTabNumber}`,
      key: newActiveKey,
      closable: false

    })
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }
  const remove = (targetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items.filter((item) => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add()
    } else {
      remove(targetKey)
    }
  }

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
          setData(rs)
          setSelectedFoods(rs.listFoodIdBreakfasts)
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
    api.mealPlanTrainerApi.createMealPlanDetailApi(updatedData).then(() => {
      handleLoadTable()
      // handleModal()
      notificationSuccess(t('Thêm kế hoạch thành công'))
    }).catch(() => {
      notificationError(t('Thêm kế hoạch thất bại'))
    }
    )

  }

  const handleModalClosed = () => {
    setDataItem({})
    setItems(initialItems)
  }
  const handleCancel = () => {
    reset(defaultValues)
    handleModalDetail()
    setActiveKey('1')
    setDataItem({})
    setItems(initialItems)
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
              type="editable-card"
              onChange={onChange}
              activeKey={activeKey}
              onEdit={onEdit}
              items={items}
            />
            <div className='box form-box__border mb-2' style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '15px' }}>
              <h5 className='form-box__border--title' style={{ marginBottom: '15px', fontWeight: 'bold' }}>
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
                </Col>

                <Col lg={3} md={3} xs={12}>
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
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-description'>
                      Mô tả
                    </Label>
                    <Controller
                      id='descriptionBreakFast'
                      name='descriptionBreakFast'
                      control={control}
                      render={({ field }) => (
                        <Input autoFocus placeholder='Nhập mô tả' invalid={errors.descriptionBreakFast && true} {...field} />
                      )}
                    />
                    {errors.descriptionBreakFast ? <FormFeedback>{errors.descriptionBreakFast.message}</FormFeedback> : null}
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
                    <Label className='form-label' for='add-foodId'>
                      Món ăn
                    </Label>
                    <Controller
                      id='listFoodIdLunches'
                      name='listFoodIdLunches'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          theme={selectThemeColors}
                          closeMenuOnSelect={false}
                          className='react-select'
                          classNamePrefix='select'
                          isMulti
                          components={animatedComponents}
                          placeholder='Chọn...'
                          options={optionFood}
                          isClearable={false}
                          onChange={(selectedOptions) => {
                            const formattedIngredients = selectedOptions ? selectedOptions.map(option => ({ foodId: option.value, quantity: 0 })) : []

                            const totalCalories = calculateTotalCalories(formattedIngredients)

                            field.onChange(formattedIngredients)
                            setValue('caloriesLunch', totalCalories)
                          }}
                          value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                        />
                      )}
                    />
                    {errors.recipeIngredients ? <FormFeedback>{errors.recipeIngredients.message}</FormFeedback> : null}
                  </div>
                </Col>
                <Col lg={3} md={3} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-calories'>
                      Calories
                    </Label>
                    <Controller
                      id='caloriesLunch'
                      name='caloriesLunch'
                      control={control}
                      render={({ field }) => (
                        <Input autoFocus placeholder='' invalid={errors.calories && true} {...field} />
                      )}
                    />
                    {errors.calories ? <FormFeedback>{errors.calories.message}</FormFeedback> : null}
                  </div>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-descriptionLunch'>
                      Mô tả
                    </Label>
                    <Controller
                      id='descriptionLunch'
                      name='descriptionLunch'
                      control={control}
                      render={({ field }) => (
                        <Input autoFocus placeholder='Nhập mô tả' invalid={errors.descriptionLunch && true} {...field} />
                      )}
                    />
                    {errors.descriptionLunch ? <FormFeedback>{errors.descriptionLunch.message}</FormFeedback> : null}
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
                    <Label className='form-label' for='add-foodId'>
                      Món ăn
                    </Label>
                    <Controller
                      id='listFoodIdDinners'
                      name='listFoodIdDinners'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          theme={selectThemeColors}
                          closeMenuOnSelect={false}
                          className='react-select'
                          classNamePrefix='select'
                          isMulti
                          components={animatedComponents}
                          placeholder='Chọn...'
                          options={optionFood}
                          isClearable={false}
                          onChange={(selectedOptions) => {
                            const formattedIngredients = selectedOptions ? selectedOptions.map(option => ({ foodId: option.value, quantity: 0 })) : []

                            const totalCalories = calculateTotalCalories(formattedIngredients)

                            field.onChange(formattedIngredients)
                            setValue('caloriesDinner', totalCalories)
                          }}
                          value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                        />
                      )}
                    />
                    {errors.recipeIngredients ? <FormFeedback>{errors.recipeIngredients.message}</FormFeedback> : null}
                  </div>
                </Col>
                <Col lg={3} md={3} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-calories'>
                      Calories
                    </Label>
                    <Controller
                      id='caloriesDinner'
                      name='caloriesDinner'
                      control={control}
                      render={({ field }) => (
                        <Input autoFocus placeholder='' invalid={errors.calories && true} {...field} />
                      )}
                    />
                    {errors.calories ? <FormFeedback>{errors.calories.message}</FormFeedback> : null}
                  </div>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-descriptionDinner'>
                      Mô tả
                    </Label>
                    <Controller
                      id='descriptionDinner'
                      name='descriptionDinner'
                      control={control}
                      render={({ field }) => (
                        <Input autoFocus placeholder='Nhập mô tả' invalid={errors.descriptionDinner && true} {...field} />
                      )}
                    />
                    {errors.descriptionDinner ? <FormFeedback>{errors.descriptionDinner.message}</FormFeedback> : null}
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
                        <Select
                          {...field}
                          theme={selectThemeColors}
                          closeMenuOnSelect={false}
                          className='react-select'
                          classNamePrefix='select'
                          isMulti
                          components={animatedComponents}
                          placeholder='Chọn...'
                          options={optionFood}
                          isClearable={false}
                          onChange={(selectedOptions) => {
                            const formattedIngredients = selectedOptions ? selectedOptions.map(option => ({ foodId: option.value, quantity: 0 })) : []

                            const totalCalories = calculateTotalCalories(formattedIngredients)

                            field.onChange(formattedIngredients)
                            setValue('caloriesSnack', totalCalories)
                          }}
                          value={optionFood.filter(option => field.value?.some(val => val.foodId === option.value))}
                        />
                      )}
                    />
                    {errors.recipeIngredients ? <FormFeedback>{errors.recipeIngredients.message}</FormFeedback> : null}
                  </div>
                </Col>
                <Col lg={3} md={3} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-calories'>
                      Calories
                    </Label>
                    <Controller
                      id='caloriesSnack'
                      name='caloriesSnack'
                      control={control}
                      render={({ field }) => (
                        <Input autoFocus placeholder='' invalid={errors.calories && true} {...field} />
                      )}
                    />
                    {errors.calories ? <FormFeedback>{errors.calories.message}</FormFeedback> : null}
                  </div>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-descriptionSnack'>
                      Mô tả
                    </Label>
                    <Controller
                      id='descriptionSnack'
                      name='descriptionSnack'
                      control={control}
                      render={({ field }) => (
                        <Input autoFocus placeholder='Nhập mô tả' invalid={errors.descriptionSnack && true} {...field} />
                      )}
                    />
                    {errors.descriptionSnack ? <FormFeedback>{errors.descriptionSnack.message}</FormFeedback> : null}
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
