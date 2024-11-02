import { Fragment, useContext} from 'react'
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
  name: ''

}

const formSchema = yup.object().shape({
  exercise_name: yup.string()
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
    //watch,
    //getValues,
    reset,
    formState: { errors }
  } = useForm({ defaultValues,  resolver: yupResolver(formSchema) })


  // const [startPicker, setStartPicker] = useState(new Date())

  const optionLevel = [
    { value: 0, label: 'Cường độ nhẹ' },
    { value: 1, label: 'Cường độ vừa' },
    { value: 2, label: 'Cường độ cao' }

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
  }


  const onSubmit = data => {
    if (typeModal === "Edit") {
      // console.log('data', data)
      // return
      api.exerciseApi.updateExerciseApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Sửa bài tập thành công'))

      }).catch(() => {
        notificationError(t('Sửa bài tập thất bại'))
      })
    } else {
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
              <div className='mb-1'>
                <Label className='form-label' for='add-recipeName'>
                  Tên công thức món ăn
                </Label>
                <Controller
                  id='recipeName'
                  name='recipeName'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập tên món ăn' invalid={errors.recipeName && true} {...field} />
                  )}
                />
                {errors.recipeName ? <FormFeedback>{errors.recipeName.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='add-gender'>
                  Thể loại bài tập
                </Label>
                <Controller
                  id='gender'
                  name='gender'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      options={[]}
                      isClearable={true}
                      onChange={(option) => {
                        field.onChange(option ? option.value : '')
                      }}
                      //value={optionGender.find(option => option.value === field.value)}
                    />
                  )}
                />
                {errors.gender ? <FormFeedback>{errors.gender.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='add-exercise_level'>
                  Cường độ vận động
                </Label>
                <Controller
                  id='exercise_level'
                  name='exercise_level'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      options={optionLevel}
                      isClearable={true}
                      onChange={(option) => {
                        field.onChange(option ? option.value : '')
                      }}
                      value={optionLevel.find(option => option.value === field.value)}
                    />
                  )}
                />
                {errors.exercise_level ? <FormFeedback>{errors.exercise_level.message}</FormFeedback> : null}
              </div>
             
              <div className='mb-1'>
                <Label className='form-label' for='add-phone'>
                  Reps
                </Label>
                <Controller
                  id='reps'
                  name='reps'
                  control={control}
                  render={({ field }) => (
                    <Input type='number' placeholder='Nhập reps' invalid={errors.reps && true} {...field} />
                  )}
                />
                {errors.reps ? <FormFeedback>{errors.reps.message}</FormFeedback> : null}
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='add-phone'>
                  Sets
                </Label>
                <Controller
                  id='sets'
                  name='sets'
                  control={control}
                  render={({ field }) => (
                    <Input type='number' placeholder='Nhập sets' invalid={errors.reps && true} {...field} />
                  )}
                />
                {errors.reps ? <FormFeedback>{errors.reps.message}</FormFeedback> : null}
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='add-phone'>
                  Phút
                </Label>
                <Controller
                  id='minutes'
                  name='minutes'
                  control={control}
                  render={({ field }) => (
                    <Input type='number' placeholder='Nhập phút' invalid={errors.minutes && true} {...field} />
                  )}
                />
                {errors.minutes ? <FormFeedback>{errors.minutes.message}</FormFeedback> : null}
              </div>

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
