import { Fragment, useContext, useState } from 'react'
import {
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalBody,
  FormFeedback,
  Form
} from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import '@styles/react/libs/react-select/_react-select.scss'
import { UserContext } from './useContext'
import { useTranslation } from 'react-i18next'
import api from '../../../../../api/index'
import ModalHeader from '../../../../../@core/components/modal-header'
import { selectThemeColors, getUserData } from '@utils'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { notificationError, notificationSuccess } from '../../../../../utility/notification'

const userData = getUserData()
console.log('userData', userData)
const defaultValues = {
  createBy: 7,
  createDate: new Date(),
  recipeImage: 'anh.png'

}

const formSchema = yup.object().shape({

})

const ModalComponent = () => {
  const {
    openModal,
    handleModal,
    handleLoadTable,
    setDataItem,
    dataItem,
    typeModal } = useContext(UserContext)
  const { t } = useTranslation()
  
  const animatedComponents = makeAnimated()

  const {
    control,
    // setError,
    clearErrors,
    handleSubmit,
    setValue,
    //watch,
    //getValues,
    reset,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(formSchema) })


  const [optionFood, setOptionFood] = useState([])
  const [optionIngredient, setOptionIngredient] = useState([])


  const renderData = () => {
    api.foodApi.getListBoxFoodApi().then((rs) => {
      setOptionFood(rs)
    }).catch(() => {

    })
    api.foodApi.getListboxIngredientApi().then((rs) => {
      setOptionIngredient(rs)
    }).catch(() => {

    })
  }

  const handleFormOpened = () => {
    renderData()
    if (typeModal === "Edit") {
      if (dataItem) {
        Object.entries(dataItem).forEach(
          ([name, value]) => {
            setValue(name, value)
          }
        )
      }
    }
  }

  const handleModalClosed = () => {
    clearErrors()
    reset()
    setDataItem({})
  }


  const onSubmit = data => {
    if (typeModal === "Edit") {
      api.recipeApi.updateRecipeApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Sửa công thức thành công'))

      }).catch(() => {
        notificationError(t('Sửa công thức thất bại'))
      })
    } else {
      // console.log('data', data)
      // return
      api.recipeApi.createRecipeApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Thêm công thức thành công'))
      }).catch(() => {
        notificationError(t('Thêm công thức thất bại'))
      }
      )
    }

  }

  const handleCancel = () => {
    handleModalClosed()
    handleModal()
  }

  const renderFooterButtons = () => {
    return (
      <Fragment>
        <Button color='primary' className='me-1'>{t('Lưu')}</Button>
        <Button color='secondary' onClick={handleCancel} outline className='me-1'>{t('Đóng')}</Button>
      </Fragment>
    )
  }
  return (
    <Fragment >
      <Modal
        isOpen={openModal && typeModal !== 'Import'}
        toggle={handleModal}
        onClosed={handleModalClosed}
        onOpened={handleFormOpened}
        backdrop='static'
        className='modal-dialog-centered modal-lg'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title={typeModal === 'Add' ? 'Thêm công thức món ăn' : 'Sửa công thức món ăn'} />
          <ModalBody>
            <Row>
              <Col lg={6} md={6} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-recipeName'>
                    Tên công thức món ăn
                  </Label>
                  <Controller
                    id='recipeName'
                    name='recipeName'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='Nhập tên công thức món ăn' invalid={errors.recipeName && true} {...field} />
                    )}
                  />
                  {errors.recipeName ? <FormFeedback>{errors.recipeName.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={6} md={6} xs={12}>

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
                        className='react-select'
                        classNamePrefix='select'
                        placeholder='Chọn...'
                        options={optionFood}
                        isClearable={false}
                        onChange={(option) => {
                          field.onChange(option ? option.value : '')
                        }}
                        value={optionFood.find(option => option.value === field.value)}
                      />
                    )}
                  />
                  {errors.foodId ? <FormFeedback>{errors.foodId.message}</FormFeedback> : null}
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>

                <div className='mb-1'>
                  <Label className='form-label' for='add-recipeIngredients'>
                    Thành phần
                  </Label>
                  <Controller
                    id='recipeIngredients'
                    name='recipeIngredients'
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
                        options={optionIngredient}
                        isClearable={false}
                        onChange={(selectedOptions) => {
                          const formattedIngredients = selectedOptions ? selectedOptions.map(option => ({ ingredientId: option.value, quantity: 0, unit: "string"})) : []
                          field.onChange(formattedIngredients) 
                        }}
                        value={optionIngredient.filter(option => field.value?.some(val => val.ingredientId === option.value)
                        )}
                      />
                    )}
                  />
                  {errors.recipeIngredients ? <FormFeedback>{errors.recipeIngredients.message}</FormFeedback> : null}
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-description'>
                    Mô tả
                  </Label>
                  <Controller
                    id='description'
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='Nhập mô tả' invalid={errors.description && true} {...field} />
                    )}
                  />
                  {errors.description ? <FormFeedback>{errors.description.message}</FormFeedback> : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-prepTime'>
                    Thời gian chuẩn bị
                  </Label>
                  <Controller
                    id='prepTime'
                    name='prepTime'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='Nhập mô tả' invalid={errors.prepTime && true} {...field} />
                    )}
                  />
                  {errors.prepTime ? <FormFeedback>{errors.prepTime.message}</FormFeedback> : null}
                </div>
              </Col>
              <Col lg={4} md={4} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-cookTime'>
                    Thời gian nấu
                  </Label>
                  <Controller
                    id='cookTime'
                    name='cookTime'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='Nhập mô tả' invalid={errors.cookTime && true} {...field} />
                    )}
                  />
                  {errors.cookTime ? <FormFeedback>{errors.cookTime.message}</FormFeedback> : null}
                </div>
              </Col>
              <Col lg={4} md={4} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-servings'>
                    Phần ăn
                  </Label>
                  <Controller
                    id='servings'
                    name='servings'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='Nhập mô tả' invalid={errors.servings && true} {...field} />
                    )}
                  />
                  {errors.servings ? <FormFeedback>{errors.servings.message}</FormFeedback> : null}
                </div>
              </Col>
              <Col lg={12} md={12} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-instructions'>
                    Hướng dẫn
                  </Label>
                  <Controller
                    id='instructions'
                    name='instructions'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus className='w-100' placeholder='Nhập hướng dẫn' invalid={errors.instructions && true} {...field} />
                    )}
                  />
                  {errors.instructions ? <FormFeedback>{errors.instructions.message}</FormFeedback> : null}
                </div>
              </Col>
            </Row>

          </ModalBody>
          <div
            className='d-flex justify-content-end p-1'
            style={{ boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}
          >
            {renderFooterButtons()}
          </div>
        </Form>
      </Modal>
    </Fragment>

  )
}

export default ModalComponent
