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
import { Tabs } from 'antd'

const defaultValues = {
  name: ''

}

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

const ModalComponent = () => {
  //const [data, setData] = useState([])

  const { openModalDetail,
    handleModalDetail,
    handleModal,
    setDataItem,
    typeModal
    // dataItem
  } = useContext(UserContext)
  const { t } = useTranslation()
  const animatedComponents = makeAnimated()

  const {
    control,
    // setError,
    // clearErrors,
    handleSubmit,
    // setValue,
    //watch,
    //getValues,
    // reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const [activeKey, setActiveKey] = useState(initialItems[0].key)
  const [items, setItems] = useState(initialItems)
  const [optionFood, setOptionFood] = useState([])
  // const newTabIndex = useRef(0)
  const onChange = (newActiveKey) => {
    // Tìm index của tab trong items khi thay đổi activeKey
    const index = items.findIndex(item => item.key === newActiveKey)
    console.log('Tab index:', index + 1) // Đây là index của tab thay đổi
    setActiveKey(newActiveKey)
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
      console.log('rs', rs)
      setOptionFood(rs)
    }).catch(() => {

    })
  }

  const handleFormOpened = () => {
    renderData()

  }

  const onSubmit = () => {

  }

  const handleModalClosed = () => {
    setDataItem({})
    setItems(initialItems)
  }
  const handleCancel = () => {
    handleModalDetail()
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color='primary' className='me-1'>{t('Lưu')}</Button>
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
            <Row>
              <Col lg={9} md={9} xs={12} >
                <div className='mb-1'>
                  <Label className='form-label' for='add-foodId'>
                    Món ăn
                  </Label>
                  <Controller
                    id='foodId'
                    name='foodId'
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
                          const formattedIngredients = selectedOptions ? selectedOptions.map(option => ({ ingredientId: option.value, quantity: 0, unit: "string" })) : []
                          field.onChange(formattedIngredients)
                        }}
                        value={optionFood.filter(option => field.value?.some(val => val.ingredientId === option.value)
                        )}
                      />
                    )}
                  />
                  {errors.recipeIngredients ? <FormFeedback>{errors.recipeIngredients.message}</FormFeedback> : null}
                </div>
              </Col>
              <Col lg={3} md={3} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-recipeName'>
                    Calories
                  </Label>
                  <Controller
                    id='recipeName'
                    name='recipeName'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='' invalid={errors.recipeName && true} {...field} />
                    )}
                  />
                  {errors.recipeName ? <FormFeedback>{errors.recipeName.message}</FormFeedback> : null}
                </div>
              </Col>
            </Row>

          </ModalBody>
        </Form>
        <div
          className='d-flex justify-content-end p-1'
          style={{ boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}
        >
          {renderFooterButtons()}
        </div>
      </Modal>
    </Fragment >
  )
}

export default ModalComponent
