import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { handleLogin } from '@store/authentication'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, Spinner } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useContext, useState } from 'react'
import { AbilityContext } from '../../../utility/context/Can'
import themeConfig from '@configs/themeConfig'
import api from '../../../api/index'
import { toast } from 'react-hot-toast'

const defaultValues = {
  password: '',
  phoneNumber: ''
}

const Login = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // Thêm state loading
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async data => {
    // Validate số điện thoại
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
    if (!phoneRegex.test(data.phoneNumber)) {
      setError('phoneNumber', {
        type: 'manual',
        message: 'Số điện thoại không hợp lệ'
      })
      return
    }

    if (Object.values(data).every(field => field.length > 0)) {
      try {
        setIsLoading(true)
        // Chuyển đổi dữ liệu để phù hợp với API
        const loginPayload = {
          phoneNumber: data.phoneNumber, // API đang expect email nhưng chúng ta gửi số điện thoại
          password: data.password
        }

        const rs = await api.authApi.loginApi(loginPayload)
        const loginData = { 
          ...rs.objectResponse, 
          accessToken: rs.data.accessToken, 
          refreshToken: rs.data.refreshToken, 
          ability: [{ action: 'read', subject: 'User' }] 
        }
        dispatch(handleLogin(loginData))
        ability.update([{ action: 'read', subject: 'User' }])
        
        toast.success('Đăng nhập thành công')
        navigate('/home')
      } catch (err) {
        console.error('Login error:', err.response?.data || err) // Log chi tiết lỗi để debug
        toast.error(err.response?.data?.message || 'Đăng nhập thất bại, vui lòng thử lại')
      } finally {
        setIsLoading(false)
      }
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: key === 'phoneNumber' ? 'Vui lòng nhập số điện thoại' : 'Vui lòng nhập mật khẩu'
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/'>
              <img className='mb-25' height={35} src={themeConfig.app.appLogoImageNoText} alt='logo' />
              <h2 className='brand-text text-primary ms-1'>Health Tracking</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Chào mừng tới Health Tracking!
            </CardTitle>
            <CardText className='mb-2'>
              Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu
            </CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-phone'>
                  Số điện thoại
                </Label>
                <Controller
                  id='phoneNumber'
                  name='phoneNumber'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='tel'
                      placeholder='0912345678'
                      invalid={errors.phoneNumber && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Mật khẩu
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Quên mật khẩu?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Nhớ tôi
                </Label>
              </div>
              <Button type='submit' color='primary' block disabled={isLoading}>
                {isLoading ? (
                  <Spinner size='sm' className='me-1' />
                ) : null}
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Người mới trên nền tảng của chúng tôi?</span>
              <Link to='/register'>
                <span>Tạo tài khoản</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login