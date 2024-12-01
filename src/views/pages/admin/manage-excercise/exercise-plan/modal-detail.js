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
    // watch,
    //getValues,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const [activeKey, setActiveKey] = useState(initialItems[0].key)
  const [items, setItems] = useState(initialItems)
  const [optionExercise, setOptionExercise] = useState([])

  const onChange = (newActiveKey) => {
    const index = items.findIndex(item => item.key === newActiveKey)
    console.log('Tab index:', index + 1)
    setActiveKey(newActiveKey)
    const tabIndex = JSON.parse(newActiveKey)

    api.exercisePlanTrainerApi.getExercisePlanDetailApi(dataItem.exercisePlanId, tabIndex)
      .then((rs) => {
        console.log('rs', rs)
        if (rs) {
          Object.entries(rs).forEach(([name, value]) => {
            setValue(name, value)
            if (name === 'listExercise') {
              calculateCalories(name, 'caloriesBreakfast')
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
    api.exerciseApi.getAllExerciseApi(1).then((rs) => {
      const mappedOptions = rs.data.map((exercise) => ({
        value: exercise.exerciseId, 
        label: exercise.exerciseName 
      }))
      setOptionExercise(mappedOptions)
    }).catch(() => {

    })
  }

  const handleFormOpened = () => {
    renderData()
    api.exercisePlanTrainerApi.getExercisePlanDetailApi(dataItem.exercisePlanId, 1)
      .then((rs) => {
        if (rs) {
          Object.entries(rs).forEach(([name, value]) => {
            setValue(name, value)
          })
        }
      })
      .catch(() => {
        reset(defaultValues)
      })
  }

  const onSubmit = data => {
    const updatedData = {
      ...data,
      exercisePlanId: dataItem.exercisePlanId,
      day: JSON.parse(activeKey)
    }
    api.exercisePlanTrainerApi.createExercisePlanDetailApi(updatedData).then(() => {
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
                            const newExercise = selectedOptions ? selectedOptions.map(option => ({
                              exerciseId: option.value,
                              duration: 0
                            })) : []
                            field.onChange(newExercise)
                          }}
                          value={optionExercise.filter(option => field.value?.some(val => val.exerciseId === option.value))} 
                        />
                      )}
                    />
                    {errors.execriseInPlans ? <FormFeedback>{errors.execriseInPlans.message}</FormFeedback> : null}
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
