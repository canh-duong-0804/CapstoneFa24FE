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
  exerciseImage: 'anh.png',
  caloriesPerHour: 0,
  createBy: 7,
  createDate: new Date(),
  exerciseCategoryId: 1

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
  const [caloriesValue, setCaloriesValue] = useState('')

  // const optionLevel = [
  //   { value: 0, label: 'Cường độ nhẹ' },
  //   { value: 1, label: 'Cường độ vừa' },
  //   { value: 2, label: 'Cường độ cao' }

  // ]
   const optionType = [
    { value: 1, label: 'Carlido' },
    { value: 2, label: 'Kháng lực' },
    { value: 3, label: 'Khác' }
    

  ]
  const handleChangeCalories = (e) => {
    const value = e.target.value
    setCaloriesValue(value)
  }
  const renderData = () => {
    // api.categoryExerciseApi.getListBoxCategoryExerciseApi().then((rs) => {
    //   setOptionCategory(rs)
    // }).catch(() => {

    // })
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
      api.exerciseApi.updateExerciseApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Sửa bài tập thành công'))

      }).catch(() => {
        notificationError(t('Sửa bài tập thất bại'))
      })
    } else {
      // console.log('data', data)
      // return
      api.exerciseApi.createExerciseApi(data).then(() => {
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

  console.log(watch('exerciseCategoryId'))
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
                id='exerciseCategoryId'
                name='exerciseCategoryId'
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
              {errors.exerciseCategoryId ? <FormFeedback>{errors.exerciseCategoryId.message}</FormFeedback> : null}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='add-met'>
                MET
              </Label>
              <Controller
                id='exerciseName'
                name='exerciseName'
                control={control}
                render={({ field }) => (
                  <Input autoFocus placeholder='Nhập MET' invalid={errors.exerciseName && true} {...field} />
                )}
              />
              {errors.exerciseName ? <FormFeedback>{errors.exerciseName.message}</FormFeedback> : null}
            </div>
            {watch('exerciseCategoryId') === 1 && (
              <Row>
                <Label className='form-label' for='add-foodName'>
                  Cường độ nhẹ
                </Label>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-calories' style={{ marginRight: '10px' }}>
                      Calo
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
                  </div>
                  {errors.calories && <FormFeedback>{errors.calories.message}</FormFeedback>}
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
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-calories' style={{ marginRight: '10px' }}>
                      Calo
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
                  </div>
                  {errors.calories && <FormFeedback>{errors.calories.message}</FormFeedback>}
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
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-calories' style={{ marginRight: '10px' }}>
                      Calo
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
                  </div>
                  {errors.calories && <FormFeedback>{errors.calories.message}</FormFeedback>}
                </Col>
              </Row>
            )}
            {watch('exerciseCategoryId') === 2 && (
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
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập reps'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Sets
                    </Label>
                    <Controller
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập sets'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
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
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập reps'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Sets
                    </Label>
                    <Controller
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập sets'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
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
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập reps'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Sets
                    </Label>
                    <Controller
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập sets'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
                </Col>
                <Col lg={4} md={4} xs={12}>
                  <div className='d-flex mb-1 align-items-center'>
                    <Label className='form-label mb-0' for='add-foodName' style={{ marginRight: '10px' }}>
                      Phút
                    </Label>
                    <Controller
                      id='foodName'
                      name='foodName'
                      control={control}
                      render={({ field }) => (
                        <Input
                          autoFocus
                          placeholder='Nhập phút'
                          invalid={errors.foodName && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.foodName && <FormFeedback>{errors.foodName.message}</FormFeedback>}
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
