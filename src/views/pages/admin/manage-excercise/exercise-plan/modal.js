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
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
// import Flatpickr from 'react-flatpickr'
import { notificationError, notificationSuccess } from '../../../../../utility/notification'
const defaultValues = {
  name: '',
  mealPlanImage: 'anh.png'

}

const formSchema = yup.object().shape({
  name: yup.string()
    .required('Tên nguyên liệu là bắt buộc')
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


  const renderData = () => {
    

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
      api.mealPlanTrainerApi.updateRoleApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Sửa kế hoạch thành công'))

      }).catch(() => {
        notificationError(t('Sửa kế hoạch thất bại'))
      })
    } else {
      // console.log('data', data)
      // return
      api.exercisePlanTrainerApi.createExercisePlanTrainerApi(data).then(() => {
          handleLoadTable()
          handleModal()
          notificationSuccess(t('Thêm kế hoạch thành công'))
      }).catch(() => {
        notificationError(t('Thêm kế hoạch thất bại'))
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
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title={typeModal === 'Add' ? 'Thêm kế hoạch bài tập' : 'Sửa kế hoạch bài tập'} />
          <ModalBody>
              <div className='mb-1'>
                <Label className='form-label' for='add-name'>
                  Tên kế hoạch bài tập
                </Label>
                <Controller
                  id='name'
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập tên kế hoạch bài tập' invalid={errors.name && true} {...field} />
                  )}
                />
                {errors.name ? <FormFeedback>{errors.name.message}</FormFeedback> : null}
              </div>
                <div className='mb-1'>
                <Label className='form-label' for='add-totalCaloriesBurned'>
                  Lượng calories đốt cháy
                </Label>
                <Controller
                  id='totalCaloriesBurned'
                  name='totalCaloriesBurned'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập calories' invalid={errors.totalCaloriesBurned && true} {...field} />
                  )}
                />
                {errors.totalCaloriesBurned ? <FormFeedback>{errors.totalCaloriesBurned.message}</FormFeedback> : null}
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
