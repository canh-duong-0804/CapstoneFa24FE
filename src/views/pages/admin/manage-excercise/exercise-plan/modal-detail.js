import { Fragment, useContext, useState } from 'react'
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
  execriseInPlans: []

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
  const [items, setItems] = useState(initialItems)
  const [optionExercise, setOptionExercise] = useState([])
  const [selectedFoods, setSelectedFoods] = useState([])
  const [isDataChanged, setIsDataChanged] = useState(false)


  const loadTabData = (tabKey) => {
    const tabIndex = JSON.parse(tabKey)
    api.exercisePlanTrainerApi.getExercisePlanDetailApi(dataItem.exercisePlanId, tabIndex)
      .then((rs) => {
        if (rs) {
          const transformedExercises = rs.execriseInPlans.map(exercise => ({
            value: exercise.exerciseId,
            label: exercise.exerciseName
          }))

          setValue('day', rs.day)
          setValue('execriseInPlans', transformedExercises)

          const fullExerciseDetails = rs.execriseInPlans.map(exercise => {
            const exerciseInfo = optionExercise.find(ex => ex.value === exercise.exerciseId)
            return {
              foodId: exercise.exerciseId,
              foodName: exercise.exerciseName,
              duration: exercise.duration,
              typeExercise: exerciseInfo?.typeExercise,
              nameTypeExercise: exerciseInfo?.nameTypeExercise,
              metValue: exerciseInfo?.metValue,
              minutesCadior1: exerciseInfo?.minutesCadior1,
              minutesCadior2: exerciseInfo?.minutesCadior2,
              minutesCadior3: exerciseInfo?.minutesCadior3,
              repsResitance1: exerciseInfo?.repsResitance1,
              repsResitance2: exerciseInfo?.repsResitance2,
              repsResitance3: exerciseInfo?.repsResitance3,
              setsResitance1: exerciseInfo?.setsResitance1,
              setsResitance2: exerciseInfo?.setsResitance2,
              setsResitance3: exerciseInfo?.setsResitance3
            }
          })

          setSelectedFoods(fullExerciseDetails)
          setIsDataChanged(false)
        }
      })
      .catch(() => {
        reset(defaultValues)
        setSelectedFoods([])
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
    api.exerciseApi.getListboxExerciseApi().then((rs) => {
      setOptionExercise(rs)
    }).catch(() => {

    })
  }

  const handleFormOpened = () => {
    renderData()
    api.exercisePlanTrainerApi.getExercisePlanDetailApi(dataItem.exercisePlanId, 1)
      .then((rs) => {
        if (rs) {
          const transformedExercises = rs.execriseInPlans.map(exercise => ({
            value: exercise.exerciseId,
            label: exercise.exerciseName
          }))

          setValue('day', rs.day)
          setValue('execriseInPlans', transformedExercises)

          const fullExerciseDetails = rs.execriseInPlans.map(exercise => {
            const exerciseInfo = optionExercise.find(ex => ex.value === exercise.exerciseId)
            return {
              foodId: exercise.exerciseId,
              foodName: exercise.exerciseName,
              duration: exercise.duration,
              typeExercise: exerciseInfo?.typeExercise,
              nameTypeExercise: exerciseInfo?.nameTypeExercise,
              metValue: exerciseInfo?.metValue,
              minutesCadior1: exerciseInfo?.minutesCadior1,
              minutesCadior2: exerciseInfo?.minutesCadior2,
              minutesCadior3: exerciseInfo?.minutesCadior3,
              repsResitance1: exerciseInfo?.repsResitance1,
              repsResitance2: exerciseInfo?.repsResitance2,
              repsResitance3: exerciseInfo?.repsResitance3,
              setsResitance1: exerciseInfo?.setsResitance1,
              setsResitance2: exerciseInfo?.setsResitance2,
              setsResitance3: exerciseInfo?.setsResitance3
            }
          })

          setSelectedFoods(fullExerciseDetails)
        }
      })
      .catch(() => {
        reset(defaultValues)
        setSelectedFoods([])
      })
  }

  console.log(watch('execriseInPlans'))

  const onSubmit = () => {
    const updatedData = {
      execriseInPlans: selectedFoods.map(food => ({
        exerciseId: food.foodId,
        duration: food.duration
      })),
      exercisePlanId: dataItem.exercisePlanId,
      day: JSON.parse(activeKey)
    }
    return api.exercisePlanTrainerApi.createExercisePlanDetailApi(updatedData)
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
        setSelectedFoods([])
      }
    }

    setActiveKey(newActiveKey)
    loadTabData(newActiveKey)
  }

  const handleModalClosed = () => {
    setDataItem({})
    setItems(initialItems)
    setSelectedFoods([])
  }
  const handleCancel = () => {
    reset(defaultValues)
    handleModalDetail()
    setActiveKey('1')
    setDataItem({})
    setItems(initialItems)
    setSelectedFoods([])
  }

  console.log('optionExx', optionExercise)

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color='primary' type='submit' className='me-1'>{t('Lưu')}</Button>
        <Button color='secondary' onClick={handleCancel} outline className='me-1'>{t('Hủy')}</Button>
      </Fragment>
    )
  }

  console.log('selectex', selectedFoods)

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
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title='Chi tiết kế hoạch bài tập' />
          <ModalBody>
            <Tabs
              type="editable-card"
              onChange={onChange}
              activeKey={activeKey}
              onEdit={onEdit}
              items={items}
            />
            <div className='box form-box__border mb-2' style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '15px' }}>
              <Row className="gy-1">
                <Col lg={9} md={9} xs={12}>
                  <div className='mb-1'>
                    <Label className='form-label' for='add-execriseInPlans'>
                      Bài tập
                    </Label>
                    <Controller
                      id='execriseInPlans'
                      name='execriseInPlans'
                      control={control}
                      render={({ field }) => (
                        <div>
                          <Select
                            {...field}
                            theme={selectThemeColors}
                            closeMenuOnSelect={false}
                            className='react-select'
                            classNamePrefix='select'
                            isMulti
                            components={animatedComponents}
                            placeholder='Chọn...'
                            options={optionExercise}
                            isClearable={false}
                            onChange={(selectedOptions) => {
                              field.onChange(selectedOptions)
                              
                              const newSelectedFoods = selectedOptions ? selectedOptions.map(option => {
                                const exerciseInfo = optionExercise.find(ex => ex.value === option.value)
                                return {
                                  foodId: option.value,
                                  foodName: option.label,
                                  duration: 0,
                                  typeExercise: exerciseInfo?.typeExercise,
                                  nameTypeExercise: exerciseInfo?.nameTypeExercise,
                                  metValue: exerciseInfo?.metValue,
                                  minutesCadior1: exerciseInfo?.minutesCadior1,
                                  minutesCadior2: exerciseInfo?.minutesCadior2,
                                  minutesCadior3: exerciseInfo?.minutesCadior3,
                                  repsResitance1: exerciseInfo?.repsResitance1,
                                  repsResitance2: exerciseInfo?.repsResitance2,
                                  repsResitance3: exerciseInfo?.repsResitance3,
                                  setsResitance1: exerciseInfo?.setsResitance1,
                                  setsResitance2: exerciseInfo?.setsResitance2,
                                  setsResitance3: exerciseInfo?.setsResitance3
                                }
                              }) : []
                              setSelectedFoods(newSelectedFoods)
                              setIsDataChanged(true)
                            }}
                            value={field.value}
                          />
                          {/* Danh sách món ăn đã chọn với input số lượng */}
                          <div className="selected-foods">
                            {selectedFoods.map((food, index) => {
                              return (
                                <div key={food.foodId} className="d-flex align-items-center gap-2 mb-2">
                                  <span className="flex-grow-1">{food.foodName}</span>
                                  <div className="d-flex flex-column me-2">
                                    {selectedFoods.length > 0 && (
                                      <Label
                                        for={`breakfast-quantity-${food.foodId}`}
                                      >
                                        Số phút
                                      </Label>
                                    )}
                                    <Input
                                      id={`breakfast-quantity-${food.foodId}`}
                                      type="number"
                                      className="w-100"
                                      placeholder="Số lượng"
                                      value={food.duration}
                                      min={0}
                                      onChange={(e) => {
                                        const newQuantity = parseFloat(e.target.value) || 0
                                        const updatedFoods = selectedFoods.map((f, i) => {
                                          if (i === index) {
                                            return { ...f, duration: newQuantity }
                                          }
                                          return f
                                        })
                                        setSelectedFoods(updatedFoods)
                                        
                                        // Cập nhật giá trị cho form theo định dạng của Select  
                                        const selectValue = updatedFoods.map(food => ({
                                          value: food.foodId,
                                          label: food.foodName
                                        }))
                                        field.onChange(selectValue)
                                        
                                        setIsDataChanged(true)
                                      }}
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
