import { Fragment, useContext } from 'react'
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
import api from '../../../../api/index'
import ModalHeader from '../../../../@core/components/modal-header'
import InputPasswordToggle from '@components/input-password-toggle'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
// import { UploadOutlined } from '@ant-design/icons'
// import { message, Upload, Button as ButtonAntd } from 'antd'
// import Flatpickr from 'react-flatpickr'
import { notificationError, notificationSuccess } from '../../../../utility/notification'
const defaultValues = {
  dob: '2024-10-29T14:10:57.583Z',
  staffImage: 'image.png'
}

const formSchema = yup.object().shape({
  fullName: yup.string()
    .required('Họ tên là bắt buộc'),
  password: yup.string()
    .required('Mật khẩu là bắt buộc'),
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .nullable()
    .max(250, 'Email không vượt quá 250 ký tự'),
  phoneNumber: yup
    .string()
    .matches(/^0\d{10}$|^0\d{9}$|^$/, 'Số điện thoại không đúng định dạng')
    .nullable()
    .max(11, 'Số điện thoại không quá 11 ký tự')
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

  // const [fileList, setFileList] = useState([])
  // const [uploading, setUploading] = useState(false)

  // const [startPicker, setStartPicker] = useState(new Date())

  const optionGender = [
    { value: true, label: 'Nam' },
    { value: false, label: 'Nữ' },
    { value: '2', label: 'Khác' }

  ]

  const optionRole = [
    { value: 1, label: 'Huấn luyện viên' },
    { value: 2, label: 'Quản lý' }
  ]


  // const handleUpload = () => {
  //   const formData = new FormData()
  //   fileList.forEach((file) => {
  //     formData.append('files[]', file)
  //   })
  //   setUploading(true)
  //   // You can use any AJAX library you like
  //   fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setFileList([])
  //       message.success('upload successfully.')
  //     })
  //     .catch(() => {
  //       message.error('upload failed.')
  //     })
  //     .finally(() => {
  //       setUploading(false)
  //     })
  // }


  const handleFormOpened = () => {
    console.log(dataItem)
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

  console.log('dataItem', dataItem)


  const onSubmit = data => {
    if (typeModal === "Edit") {
      api.staffApi.updateRoleApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Đổi vai trò thành công'))

      }).catch(() => {
        notificationError(t('Đổi vai trò thất bại'))
      })
    } else {
      api.staffApi.createAccountApi(data).then(() => {
        handleLoadTable()
        handleModal()
        notificationSuccess(t('Thêm tài khoản thành công'))
      }).catch(() => {
        notificationError(t('Thêm tài khoản thất bại'))
      }
      )
    }

  }

  // const props = {
  //   onRemove: (file) => {
  //     const index = fileList.indexOf(file)
  //     const newFileList = fileList.slice()
  //     newFileList.splice(index, 1)
  //     setFileList(newFileList)
  //   },
  //   beforeUpload: (file) => {
  //     setFileList([...fileList, file])
  //     return false
  //   },
  //   fileList
  // }

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
            {typeModal !== 'Edit' && (
              <div className='mb-1'>
                <Label className='form-label' for='add-fullName'>
                  Họ tên
                </Label>
                <Controller
                  id='fullName'
                  name='fullName'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập họ tên' invalid={errors.fullName && true} {...field} />
                  )}
                />
                {errors.fullName ? <FormFeedback>{errors.fullName.message}</FormFeedback> : null}
              </div>
            )}

            {typeModal !== 'Edit' && (
              <div className='mb-1'>
                <Label className='form-label' for='add-email'>
                  Email
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input type='email' placeholder='Nhập email' invalid={errors.email && true} {...field} />
                  )}
                />
                {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : null}
              </div>
            )}
            {typeModal !== 'Edit' && (
              <div className='mb-1'>
                <Label className='form-label' for='add-password'>
                  Mật khẩu
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
            )}

            {typeModal !== 'Edit' && (
              <div className='mb-1'>
                <Label className='form-label' for='add-gender'>
                  Giới tính
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
                      options={optionGender}
                      isClearable={true}
                      onChange={(option) => {
                        field.onChange(option ? option.value : '')
                      }}
                      value={optionGender.find(option => option.value === field.value)}
                    />
                  )}
                />
                {errors.gender ? <FormFeedback>{errors.gender.message}</FormFeedback> : null}
              </div>
            )}
            {typeModal !== 'Edit' && (
              <div className='mb-1'>
                <Label className='form-label' for='add-phone'>
                  Số điện thoại
                </Label>
                <Controller
                  id='phoneNumber'
                  name='phoneNumber'
                  control={control}
                  render={({ field }) => (
                    <Input type='phone' placeholder='Nhập số điện thoại' invalid={errors.phoneNumber && true} {...field} />
                  )}
                />
                {errors.phoneNumber ? <FormFeedback>{errors.phoneNumber.message}</FormFeedback> : null}
              </div>
            )}

            <div className='mb-1'>
              <Label className='form-label' for='add-role'>
                Vai trò
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
                    options={optionRole}
                    isClearable={true}
                    onChange={(option) => {
                      field.onChange(option ? option.value : '')
                    }}
                    value={optionRole.find(option => option.value === field.value)}
                  />
                )}
              />
              {errors.role ? <FormFeedback>{errors.role.message}</FormFeedback> : null}
            </div>
            {typeModal !== 'Edit' && (
              <div className='mb-1'>
                <Label className='form-label' for='add-description'>
                  Mô tả
                </Label>
                <Controller
                  id='description'
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Input type='description' placeholder='Nhập mô tả' invalid={errors.description && true} {...field} />
                  )}
                />
                {errors.description ? <FormFeedback>{errors.description.message}</FormFeedback> : null}
              </div>
            )}
            {/* {typeModal !== 'Edit' && (
              <div className='mb-1'>
              <Upload {...props}>
                <ButtonAntd icon={<UploadOutlined />}>Chọn Ảnh</ButtonAntd>
              </Upload>
              <ButtonAntd
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                  marginTop: 16
                }}
              >
                {uploading ? 'Uploading' : 'Start Upload'}
              </ButtonAntd>
            </div>
            )} */}


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
