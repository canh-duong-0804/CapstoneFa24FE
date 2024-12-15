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
import api from '../../../../api'
import ModalHeader from '../../../../@core/components/modal-header'
import { selectThemeColors } from '@utils'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
// import Flatpickr from 'react-flatpickr'
import { notificationError, notificationSuccess } from '../../../../utility/notification'
const defaultValues = {
  
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

  const {
    control,
    // setError,
    clearErrors,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(formSchema) })

   const [optionTrainer, setOptionTrainer] = useState([])

  const renderData = () => {
    api.adminChatApi.getAllTrainerApi().then((rs) => {
      
      setOptionTrainer(rs)
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

  console.log(dataItem)


  const onSubmit = data => {
    if (typeModal === "Edit") {
      const payload = {
        chatId: dataItem.messageChatId,
        staffId: data.role
      }
      api.adminChatApi.asignStaffApi(payload).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Giao nhiệm vụ thành công'))
      }).catch(() => {
        notificationError(t('Giao nhiệm vụ thất bại'))
      })
    } else {
      
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
          <ModalHeader typeModal={typeModal} handleModal={handleCancel} title={typeModal === 'Add' ? 'Thêm tài khoản' : 'Sửa vai trò'} />
          <ModalBody>
            <div className='mb-1'>
              <Label className='form-label' for='add-role'>
                Huấn luyện viên
              </Label>
              <Controller
                id='role'
                name='role'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={optionTrainer}
                    placeholder='Chọn...'
                    isClearable={true}
                    onChange={(option) => {
                      field.onChange(option ? option.value : '')
                    }}
                    value={optionTrainer.find(option => option.value === field.value)}
                  />
                )}
              />
              {errors.role ? <FormFeedback>{errors.role.message}</FormFeedback> : null}
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
