import { Link, useNavigate } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { handleLogin } from '@store/authentication'
import InputPasswordToggle from '@components/input-password-toggle'
import api from '../../../api/index'
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { useContext } from 'react'
import { AbilityContext } from '../../../utility/context/Can'

const defaultValues = {
  password: '',
  email: ''
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const illustration = skin === 'dark' ? 'healtracking.png' : 'healtracking.png',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      api.authApi.loginApi(data)
        .then((rs) => {
          const data = { ...rs.objectResponse, accessToken: rs.data.accessToken, refreshToken: rs.data.refreshToken, ability: [{ action: 'read', subject: 'User' }] }
          dispatch(handleLogin(data))
          ability.update([{ action: 'read', subject: 'User' }])
          navigate('/home')
        })
        .catch(err => console.log(err))
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
        <img className='mb-25' height={45} src={themeConfig.app.appLogoImageNoText} alt='logo' />
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Chào mừng tới Health Tracking! 👋
            </CardTitle>
            <CardText className='mb-2'>Vui lòng đăng nhập vào tài khoản của bạn và bắt đầu</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      // type='email'
                      placeholder=''
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
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
              <Button type='submit' color='primary' block>
                Đăng nhập
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Người mới trên nền tảng của chúng tôi?</span>
              <Link to='/register'>
                <span>Tạo tài khoản</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>hoặc</div>
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

export default Login