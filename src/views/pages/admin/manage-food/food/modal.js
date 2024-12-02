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
import { selectThemeColors } from '@utils'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
// import Flatpickr from 'react-flatpickr'
import { notificationError, notificationSuccess } from '../../../../../utility/notification'
const defaultValues = {
  foodName: '',
  portion: '',
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  vitaminA: 0,
  vitaminC: 0,
  vitaminD: 0,
  vitaminE: 0,
  vitaminB1: 0,
  vitaminB2: 0,
  vitaminB3: 0,
  foodImage: 'anh.png',
  dietname: '',
  status: true
}

const formSchema = yup.object().shape({
  foodName: yup.string()
    .required('Tên món ăn là bắt buộc')
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


  const [optionDiet, setOptionDiet] = useState([])
  const [caloriesValue, setCaloriesValue] = useState('')
  const [proteinValue, setProteinValue] = useState('')
  const [carbsValue, setCarbsValue] = useState('')
  const [fatValue, setFatValue] = useState('')
  const [vitaminAValue, setVitaminAValue] = useState('')
  const [vitaminCValue, setVitaminCValue] = useState('')
  const [vitaminDValue, setVitaminDValue] = useState('')
  const [vitaminEValue, setVitaminEValue] = useState('')
  const [vitaminB1Value, setVitaminB1Value] = useState('')
  const [vitaminB2Value, setVitaminB2Value] = useState('')
  const [vitaminB3Value, setVitaminB3Value] = useState('')


  const handleChangeCalories = (e) => {
    const value = e.target.value
    setCaloriesValue(value)
  }

  const optionStatus = [
    { value: true, label: 'Hoạt động' },
    { value: false, label: 'Không hoạt động' }

  ]

  const renderData = () => {
    api.foodApi.getListboxDietApi().then((rs) => {
      const formattedOptions = rs.map(item => ({
        value: item.dietId,
        label: item.dietName
      }))
      setOptionDiet(formattedOptions)
    }).catch(() => {

    })

  }

  const handleFormOpened = () => {
    renderData()
    if (typeModal === "Edit") {
      console.log('dataItem', dataItem)
      if (dataItem) {
        Object.entries(dataItem).forEach(
          ([name, value]) => {
            setValue(name, value)
            if (name === 'calories') {
              setCaloriesValue(value)
            }
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
      // console.log('data', data)
      // return
      api.foodApi.updateFoodApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Sửa món ăn thành công'))

      }).catch(() => {
        notificationError(t('Sửa món ăn thất bại'))
      })
    } else {
      const currentDate = new Date()
    // Format date to dd-mm-yyyy
    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Month is 0-based
    const year = currentDate.getFullYear()
    
    data.createDate = `${day}-${month}-${year}`
      api.foodApi.createFoodApi(data).then(() => {
        handleLoadTable()
        handleModal()
        handleModalClosed()
        notificationSuccess(t('Thêm món ăn thành công'))
      }).catch(() => {
        notificationError(t('Thêm món ăn thất bại'))
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
        className='modal-dialog-centered modal-xl'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title={typeModal === 'Add' ? 'Thêm món ăn' : 'Sửa món ăn'} />
          <ModalBody>
            <Row>
              <Col lg={3} md={3} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-foodName'>
                    Tên món ăn
                  </Label>
                  <Controller
                    id='foodName'
                    name='foodName'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='Nhập tên món ăn' invalid={errors.foodName && true} {...field} />
                    )}
                  />
                  {errors.foodName ? <FormFeedback>{errors.foodName.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={3} md={3} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-portion'>
                    
                  </Label>
                  <Controller
                    id='portion'
                    name='portion'
                    control={control}
                    render={({ field }) => (
                      <Input autoFocus placeholder='Nhập khẩu phần ăn' invalid={errors.portion && true} {...field} />
                    )}
                  />
                  {errors.portion ? <FormFeedback>{errors.portion.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={3} md={3} xs={12}>

                <div className='mb-1'>
                  <Label className='form-label' for='add-dietId'>
                    Chế độ ăn
                  </Label>
                  <Controller
                    id='dietId'
                    name='dietId'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        placeholder='Chọn...'
                        options={optionDiet}
                        isClearable={false}
                        onChange={(option) => {
                          field.onChange(option ? option.value : '')
                        }}
                        value={optionDiet.find(option => option.value === field.value)}
                      />
                    )}
                  />
                  {errors.dietId ? <FormFeedback>{errors.dietId.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={3} md={3} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-calories'>
                    Calories
                  </Label>
                  <Controller
                    id='calories'
                    name='calories'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        placeholder='Nhập Calo'
                        invalid={errors.calories && true}
                        value={caloriesValue}
                        onChange={(e) => {
                          handleChangeCalories(e)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.calories ? <FormFeedback>{errors.calories.message}</FormFeedback> : null}
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-protein'>
                    Protein
                  </Label>
                  <Controller
                    id='protein'
                    name='protein'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.protein && true}
                        value={proteinValue}
                        onChange={(e) => {
                          setProteinValue(e.target.value)
                          field.onChange(e) // Gọi onChange từ Controller
                        }}
                      />
                    )}
                  />
                  {errors.protein ? <FormFeedback>{errors.protein.message}</FormFeedback> : null}
                </div>
              </Col>
              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-carbs'>
                    Carbs
                  </Label>
                  <Controller
                    id='carbs'
                    name='carbs'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        invalid={errors.carbs && true}
                        value={carbsValue}
                        onChange={(e) => {
                          setCarbsValue(e.target.value)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.carbs ? <FormFeedback>{errors.carbs.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-fat'>
                    Fat
                  </Label>
                  <Controller
                    id='fat'
                    name='fat'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.fat && true}
                        value={fatValue}
                        onChange={(e) => {
                          setFatValue(e.target.value)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.fat ? <FormFeedback>{errors.fat.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-vitaminA'>
                    Vitamin A
                  </Label>
                  <Controller
                    id='vitaminA'
                    name='vitaminA'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.vitaminA && true}
                        value={vitaminAValue}
                        onChange={(e) => {
                          setVitaminAValue(e.target.value)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.vitaminA ? <FormFeedback>{errors.vitaminA.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-vitaminC'>
                    Vitamin C
                  </Label>
                  <Controller
                    id='vitaminC'
                    name='vitaminC'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.vitaminC && true}
                        value={vitaminCValue}
                        onChange={(e) => {
                          setVitaminCValue(e.target.value)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.vitaminC ? <FormFeedback>{errors.vitaminC.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-vitaminD'>
                    Vitamin D
                  </Label>
                  <Controller
                    id='vitaminD'
                    name='vitaminD'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.vitaminD && true}
                        value={vitaminDValue}
                        onChange={(e) => {
                          setVitaminDValue(e.target.value)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.vitaminD ? <FormFeedback>{errors.vitaminD.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-vitaminE'>
                    Vitamin E
                  </Label>
                  <Controller
                    id='vitaminE'
                    name='vitaminE'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.vitaminE && true}
                        value={vitaminEValue}
                        onChange={(e) => {
                          setVitaminEValue(e.target.value)
                          field.onChange(e) // Gọi onChange từ Controller
                        }}
                      />
                    )}
                  />
                  {errors.vitaminE ? <FormFeedback>{errors.vitaminE.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-vitaminB1'>
                    Vitamin B1
                  </Label>
                  <Controller
                    id='vitaminB1'
                    name='vitaminB1'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.vitaminB1 && true}
                        value={vitaminB1Value}
                        onChange={(e) => {
                          setVitaminB1Value(e.target.value)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.vitaminB1 ? <FormFeedback>{errors.vitaminB1.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-vitaminB2'>
                    Vitamin B2
                  </Label>
                  <Controller
                    id='vitaminB2'
                    name='vitaminB2'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.vitaminB2 && true}
                        value={vitaminB2Value}
                        onChange={(e) => {
                          setVitaminB2Value(e.target.value)
                          field.onChange(e)
                        }}
                      />
                    )}
                  />
                  {errors.vitaminB2 ? <FormFeedback>{errors.vitaminB2.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={1} md={1} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='add-vitaminB3'>
                    Vitamin B3
                  </Label>
                  <Controller
                    id='vitaminB3'
                    name='vitaminB3'
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        type='number'
                        invalid={errors.vitaminB3 && true}
                        value={vitaminB3Value}
                        onChange={(e) => {
                          setVitaminB3Value(e.target.value)
                          field.onChange(e) // Gọi onChange từ Controller
                        }}
                      />
                    )}
                  />
                  {errors.vitaminB3 ? <FormFeedback>{errors.vitaminB3.message}</FormFeedback> : null}
                </div>
              </Col>

              <Col lg={2} md={2} xs={12}>

                <div className='mb-1'>
                  <Label className='form-label' for='add-status'>
                    Trạng thái
                  </Label>
                  <Controller
                    id='status'
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        options={optionStatus}
                        isClearable={false}
                        onChange={(option) => {
                          field.onChange(option ? option.value : '')
                        }}
                        value={optionStatus.find(option => option.value === field.value)}
                      />
                    )}
                  />
                  {errors.status ? <FormFeedback>{errors.status.message}</FormFeedback> : null}
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
