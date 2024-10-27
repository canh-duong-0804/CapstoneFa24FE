import { Link } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { notificationError, notificationSuccess } from '../../../utility/notification'

// ** Reactstrap Imports
import { Row, Col, CardTitle, Label, Button, Form, Input, FormFeedback } from 'reactstrap'
import api from '../../../api'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const defaultValues = {
  email: '',
  userName: '',
  password: '',
  dob: '2024-10-25T08:29:37.162Z',
  phone: '',
  gender: null
}

const Register = () => {
  // ** Hooks
  const { skin } = useSkin()
  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  // const [startPicker, setStartPicker] = useState(new Date())

  const optionGender = [
    { value: true, label: 'Nam' },
    { value: false, label: 'Nữ' },
    { value: '2', label: 'Khác' }

  ]

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = data => {
    api.authApi.registerApi(data).then(() => {
      notificationSuccess('Đăng ký tài khoản thành công')
      reset() 
    }).catch((e) => {
      notificationError('Đăng ký tài khoản thất bại')
      setError('Register account fail', e)
    })
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ms-1'>Vuexy</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Tạo tài khoản 🚀
            </CardTitle>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                <Controller
                  id='userName'
                  name='userName'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='Nhập tên tài khoản' invalid={errors.username && true} {...field} />
                  )}
                />
                {errors.username ? <FormFeedback>{errors.username.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>
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
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
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
              {/* <div className='mb-1'>
                <Label className='form-label' for='register-date'>
                  Ngày sinh
                </Label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Flatpickr
                      required
                      id='date'
                      className='form-control' s
                      onChange={date => {
                        setStartPicker(date[0])
                        field.onChange(date[0]) // Cập nhật giá trị cho field
                      }}
                      value={startPicker}
                      options={{
                        dateFormat: 'Y-m-d' // Chỉnh sửa định dạng ngày nếu cần
                      }}
                    />
                  )}
                />
                {errors.date && <FormFeedback>{errors.date.message}</FormFeedback>}
              </div> */}
              <div className='mb-1'>
                <Label className='form-label' for='register-gender'>
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
                      isClearable={false}
                      onChange={(option) => {
                        field.onChange(option ? option.value : '') 
                      }}
                      value={optionGender.find(option => option.value === field.value)}
                    />
                  )}
                />
                {errors.gender ? <FormFeedback>{errors.gender.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-phone'>
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
              <Button type='submit' block color='primary'>
                Đăng ký
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Bạn đã có tài khoản?</span>
              <Link to='/login'>
                <span>Đăng nhập ngay</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
