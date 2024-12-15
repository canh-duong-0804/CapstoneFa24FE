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
import Select from 'react-select'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { notificationError, notificationSuccess } from '../../../../utility/notification'

const formSchema = yup.object().shape({
  fullName: yup.string().required('Họ tên là bắt buộc'),
  email: yup.string().email('Email không đúng định dạng').required('Email là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
  phoneNumber: yup.string()
    .matches(/^0\d{9,10}$/, 'Số điện thoại không đúng định dạng')
    .required('Số điện thoại là bắt buộc'),
  role: yup.string().required('Vai trò là bắt buộc'),
  gender: yup.string().required('Giới tính là bắt buộc')
})

const defaultValues = {
  dob: '2024-10-29T14:10:57.583Z',
  staffImage: 'image.png'
}

const optionGender = [
  { value: 0, label: 'Nam' },
  { value: 1, label: 'Nữ' }
]

const optionRole = [
  { value: 0, label: 'Admin' },
  { value: 1, label: 'Huấn luyện viên' },
  { value: 2, label: 'HLV món ăn' },
  { value: 3, label: 'HLV bài tập' }
]

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
        <ModalHeader className='bg-transparent' toggle={handleModal}>
          <h2 className='modal-title fw-bolder'>
            {typeModal === 'Add' ? 'Thêm tài khoản mới' : 'Cập nhật tài khoản'}
          </h2>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <div className='mb-3'>
                  <Label className='form-label fw-bolder' for='fullName'>
                    Họ và tên <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    name='fullName'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='Nhập họ tên' className='form-control-lg' />
                    )}
                  />
                  {errors.fullName && <FormFeedback className='d-block'>{errors.fullName.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className='mb-3'>
                  <Label className='form-label fw-bolder' for='email'>
                    Email <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    id='email'
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <Input type='email' placeholder='Nhập email' className='form-control-lg' invalid={errors.email && true} {...field} />
                    )}
                  />
                  {errors.email && <FormFeedback className='d-block'>{errors.email.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className='mb-3'>
                  <Label className='form-label fw-bolder' for='password'>
                    Mật khẩu <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    id='password'
                    name='password' 
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle className='input-group-merge form-control-lg' invalid={errors.password && true} {...field} />
                    )}
                  />
                  {errors.password && <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className='mb-3'>
                  <Label className='form-label fw-bolder' for='gender'>
                    Giới tính <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    id='gender'
                    name='gender'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className='react-select'
                        classNamePrefix='select'
                        options={optionGender}
                        placeholder='Chọn giới tính'
                        isClearable={true}
                        onChange={(option) => field.onChange(option ? option.value : '')}
                        value={optionGender.find(option => option.value === field.value)}
                      />
                    )}
                  />
                  {errors.gender && <FormFeedback className='d-block'>{errors.gender.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className='mb-3'>
                  <Label className='form-label fw-bolder' for='phoneNumber'>
                    Số điện thoại <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    id='phoneNumber'
                    name='phoneNumber'
                    control={control}
                    render={({ field }) => (
                      <Input type='tel' placeholder='Nhập số điện thoại' className='form-control-lg' invalid={errors.phoneNumber && true} {...field} />
                    )}
                  />
                  {errors.phoneNumber && <FormFeedback className='d-block'>{errors.phoneNumber.message}</FormFeedback>}
                </div>
              </Col>
              <Col md={6}>
                <div className='mb-3'>
                  <Label className='form-label fw-bolder' for='role'>
                    Vai trò <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    id='role'
                    name='role'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className='react-select'
                        classNamePrefix='select'
                        options={optionRole}
                        placeholder='Chọn vai trò'
                        isClearable={true}
                        onChange={(option) => field.onChange(option ? option.value : '')}
                        value={optionRole.find(option => option.value === field.value)}
                      />
                    )}
                  />
                  {errors.role && <FormFeedback className='d-block'>{errors.role.message}</FormFeedback>}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <div
          className='d-flex justify-content-end p-1'
          style={{ boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}
        >
          {renderFooterButtons()}
        </div>
      </Modal>
    </Fragment>

  )
}

export default ModalComponent
