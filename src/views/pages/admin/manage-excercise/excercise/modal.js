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
import {Upload } from 'lucide-react'
// import Flatpickr from 'react-flatpickr'
import { notificationError, notificationSuccess } from '../../../../../utility/notification'

const defaultValues = {
  exerciseImage: '',
  caloriesPerHour: 0,
  createBy: 7,
  createDate: new Date(),
  typeExercise: 1

}

const formSchema = yup.object().shape({
  exerciseName: yup.string()
    .required('Tên bài tập là bắt buộc')
  // name: yup.string()
  //   .required(`${t("Name VTHH")} ${t("is required")}`)
  //   .max(150, `${t("Name VTHH")} ${t("less than 150 characters")}`)
  //   .min(2, `${t("Name VTHH")} ${t("greater than 1 characters")}`)
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
    watch,
    //getValues,
    reset,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(formSchema) })


  // const [optionCategory, setOptionCategory] = useState([])
  const [calories1Value, setCalories1Value] = useState('')
  const [calories2Value, setCalories2Value] = useState('')
  const [calories3Value, setCalories3Value] = useState('')

  const [imagePreview, setImagePreview] = useState(null)
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue('exerciseImage', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  console.log('exc', watch('exerciseImage'))

  const handleChangeCalories1 = (e) => {
    setCalories1Value(e.target.value)
  }

  const handleChangeCalories2 = (e) => {
    setCalories2Value(e.target.value)
  }

  const handleChangeCalories3 = (e) => {
    setCalories3Value(e.target.value)
  }

 
   const optionType = [
    { value: 1, label: 'Carlido' },
    { value: 2, label: 'Kháng lực' },
    { value: 3, label: 'Khác' }
    
  ]
  
  const handleFormOpened = () => {
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
    setImagePreview({})
  }


  const onSubmit = data => {
    const imageFile = data.exerciseImage
    const transformedData = {
      exerciseName: data.exerciseName,
      description: data.description,
      typeExercise: data.typeExercise,
      metValue: parseFloat(data.metValue) || 0,
      resistanceMetrics: {
        reps1: parseInt(data.reps1) || 0,
        reps2: parseInt(data.reps2) || 0,
        reps3: parseInt(data.reps3) || 0,
        sets1: parseInt(data.sets1) || 0,
        sets2: parseInt(data.sets2) || 0,
        sets3: parseInt(data.sets3) || 0,
        minutes1: parseInt(data.minutes1) || 0,
        minutes2: parseInt(data.minutes2) || 0,
        minutes3: parseInt(data.minutes3) || 0
      },
      cardioMetrics: {
        minutes1: parseInt(data.minutes1) || 0,
        minutes2: parseInt(data.minutes2) || 0,
        minutes3: parseInt(data.minutes3) || 0,
        calories1: parseInt(data.calories1) || 0,
        calories2: parseInt(data.calories2) || 0,
        calories3: parseInt(data.calories3) || 0
      }
    }
    if (typeModal === "Edit") {
      console.log('obj', transformedData)
      api.exerciseApi.updateExerciseApi(transformedData).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Sửa bài tập thành công'))

      }).catch(() => {
        notificationError(t('Sửa bài tập thất bại'))
      })
    } else {
      // console.log('data', data)
      // return
      api.exerciseApi.createExerciseApi(transformedData).then((rs) => {
        if (imageFile && typeof imageFile !== 'string') {
          api.exerciseApi.updateExerciseImageApi(imageFile, rs)
        }
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Thêm bài tập thành công'))
      }).catch(() => {
        notificationError(t('Thêm bài tập thất bại'))
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

  console.log(watch('typeExercise'))
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
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title={typeModal === 'Add' ? 'Thêm bài tập' : 'Sửa bài tập'} />
          <ModalBody>
            <div className='mb-1'>
              <Label className='form-label' for='add-exerciseName'>
                Tên bài tập
              </Label>
              <Controller
                id='exerciseName'
                name='exerciseName'
                control={control}
                render={({ field }) => (
                  <Input autoFocus placeholder='Nhập tên bài tập' invalid={errors.exerciseName && true} {...field} />
                )}
              />
              {errors.exerciseName ? <FormFeedback>{errors.exerciseName.message}</FormFeedback> : null}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='add-category'>
                Thể loại bài tập
              </Label>
              <Controller
                id='typeExercise'
                name='typeExercise'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={optionType}
                    placeholder='Chọn...'
                    isClearable={true}
                    onChange={(option) => {
                      field.onChange(option ? option.value : '')
                    }}
                    value={optionType.find(option => option.value === field.value)}
                  />
                )}
              />
              {errors.typeExercise ? <FormFeedback>{errors.typeExercise.message}</FormFeedback> : null}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='add-met'>
                MET
              </Label>
              <Controller
                id='metValue'
                name='metValue'
                control={control}
                render={({ field }) => (
                  <Input autoFocus placeholder='Nhập MET' invalid={errors.metValue && true} {...field} />
                )}
              />
              {errors.metValue ? <FormFeedback>{errors.metValue.message}</FormFeedback> : null}
            </div>
            {watch('typeExercise') === 1 && (
              <Row>
                <Label className='form-label' for='add-reps1'>
                  Cường độ nhẹ
                </Label>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-reps1' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='reps1'
                      name='reps1'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.reps1 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.reps1 && <FormFeedback>{errors.reps1.message}</FormFeedback>}
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-calories' style={{ marginRight: '10px' }}>
                      Calo
                    </Label>
                    <Controller
                      id='calories1'
                      name='calories1'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type='number'
                          placeholder='Nhập Calo'
                          invalid={errors.calories1 && true}
                          value={calories1Value}
                          onChange={(e) => {
                            handleChangeCalories1(e)
                            field.onChange(e)
                          }}
                        />
                      )}
                    />
                  </div>
                  {errors.calories1 && <FormFeedback>{errors.calories1.message}</FormFeedback>}
                </Col>
                <Label className='form-label' for='add-foodName'>
                  Cường độ vừa
                </Label>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='minutes2'
                      name='minutes2'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.minutes2 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.minutes2 && <FormFeedback>{errors.minutes2.message}</FormFeedback>}
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-calories' style={{ marginRight: '10px' }}>
                      Calo
                    </Label>
                    <Controller
                      id='calories2'
                      name='calories2'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type='number'
                          placeholder='Nhập Calo'
                          invalid={errors.calories2 && true}
                          value={calories2Value}
                          onChange={(e) => {
                            handleChangeCalories2(e)
                            field.onChange(e)
                          }}
                        />
                      )}
                    />
                  </div>
                  {errors.calories2 && <FormFeedback>{errors.calories2.message}</FormFeedback>}
                </Col>
                <Label className='form-label' for='add-foodName'>
                  Cường độ cao
                </Label>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='minutes3'
                      name='minutes3'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.minutes3 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.minutes3 && <FormFeedback>{errors.minutes3.message}</FormFeedback>}
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-calories' style={{ marginRight: '10px' }}>
                      Calo
                    </Label>
                    <Controller
                      id='calories3'
                      name='calories3'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          type='number'
                          placeholder='Nhập Calo'
                          invalid={errors.calories3 && true}
                          value={calories3Value}
                          onChange={(e) => {
                            handleChangeCalories3(e)
                            field.onChange(e)
                          }}
                        />
                      )}
                    />
                  </div>
                  {errors.calories3 && <FormFeedback>{errors.calories3.message}</FormFeedback>}
                </Col>
              </Row>
            )}
            {watch('typeExercise') === 2 && (
              <Row>
                <Label className='form-label' for='add-foodName'>
                  Cường độ nhẹ
                </Label>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Reps
                    </Label>
                    <Controller
                      id='reps1'
                      name='reps1'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập reps'
                          invalid={errors.reps1 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.reps1 && <FormFeedback>{errors.reps1.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Sets
                    </Label>
                    <Controller
                      id='sets1'
                      name='sets1'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập sets'
                          invalid={errors.sets1 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.sets1 && <FormFeedback>{errors.sets1.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='minutes1'
                      name='minutes1'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.minutes1 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.minutes1 && <FormFeedback>{errors.minutes1.message}</FormFeedback>}
                </Col>
                <Label className='form-label' for='add-foodName'>
                  Cường độ vừa
                </Label>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Reps
                    </Label>
                    <Controller
                      id='reps2'
                      name='reps2'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập reps'
                          invalid={errors.reps2 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.reps2 && <FormFeedback>{errors.reps2.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Sets
                    </Label>
                    <Controller
                      id='sets2'
                      name='sets2'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập sets'
                          invalid={errors.sets2 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.sets2 && <FormFeedback>{errors.sets2.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='minutes2'
                      name='minutes2'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.minutes2 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.minutes2 && <FormFeedback>{errors.minutes2.message}</FormFeedback>}
                </Col>
                <Label className='form-label' for='add-foodName'>
                  Cường độ cao
                </Label>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Reps
                    </Label>
                    <Controller
                      id='reps3'
                      name='reps3'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập reps'
                          invalid={errors.reps3 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.reps3 && <FormFeedback>{errors.reps3.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Sets
                    </Label>
                    <Controller
                      id='sets3'
                      name='sets3'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập sets'
                          invalid={errors.sets3 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.sets3 && <FormFeedback>{errors.sets3.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='minutes3'
                      name='minutes3'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.minutes3 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.minutes3 && <FormFeedback>{errors.minutes3.message}</FormFeedback>}
                </Col>
              </Row>
            )}
            <div className='mb-1'>
              <Label className='form-label' for='add-description'>
                Nhập mô tả
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

            <div className='mb-1'>
              <Label className='form-label' for='exerciseImage'>
                Hình ảnh bài tập
              </Label>
              <div className='d-flex flex-column align-items-center'>
                {imagePreview ? (
                  <div className='position-relative mb-1'>
                    <img
                      src={imagePreview}
                      alt='Exercise preview'
                      className='rounded'
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <Button
                      color='danger'
                      size='sm'
                      className='position-absolute top-0 end-0 mt-1 me-1'
                      onClick={() => {
                        setValue('exerciseImage', '')
                        setImagePreview(null)
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <div 
                    className='d-flex flex-column align-items-center justify-content-center p-3 border rounded'
                    style={{ width: '200px', height: '200px', cursor: 'pointer' }}
                    onClick={() => document.getElementById('exerciseImage').click()}
                  >
                    <Upload size={48} className='mb-1 text-muted' />
                    <span className='text-muted'>Click để tải ảnh lên</span>
                  </div>
                )}
                <input
                  type='file'
                  id='exerciseImage'
                  hidden
                  accept='image/*'
                  onChange={handleImageChange}
                />
                {errors.exerciseImage && (
                  <div className='text-danger mt-1'>{errors.exerciseImage.message}</div>
                )}
              </div>
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
    </Fragment>

  )
}

export default ModalComponent
