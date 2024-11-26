import { Fragment, useContext, useState} from 'react'
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
import { selectThemeColors } from '@utils'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
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

  const [optionDiet, setOptionDiet] = useState([])

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
      api.mealPlanTrainerApi.createMealPlanTrainerApi(data).then(() => {
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
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title={typeModal === 'Add' ? 'Thêm kế hoạch bữa ăn' : 'Sửa nguyên liệu'} />
          <ModalBody>
              <div className='mb-1'>
                <Label className='form-label' for='add-name'>
                  Tên kế hoạch bữa ăn
                </Label>
                <Controller
                  id='name'
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập tên kế hoạch bữa ăn' invalid={errors.name && true} {...field} />
                  )}
                />
                {errors.name ? <FormFeedback>{errors.name.message}</FormFeedback> : null}
              </div>
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
                <div className='mb-1'>
                <Label className='form-label' for='add-shortDescription'>
                  Mô tả ngắn
                </Label>
                <Controller
                  id='shortDescription'
                  name='shortDescription'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập mô tả ngắn' invalid={errors.shortDescription && true} {...field} />
                  )}
                />
                {errors.shortDescription ? <FormFeedback>{errors.shortDescription.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='add-longdesc'>
                  Mô tả dài
                </Label>
                <Controller
                  id='longDescription'
                  name='longDescription'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập tên kế hoạch bữa ăn' invalid={errors.longDescription && true} {...field} />
                  )}
                />
                {errors.longDescription ? <FormFeedback>{errors.longDescription.message}</FormFeedback> : null}
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
