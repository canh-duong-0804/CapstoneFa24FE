// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {Coffee, X } from 'react-feather'
import { handleLogin } from '@store/authentication'
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser } from '@utils'
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'
import api from '../../../api/index'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: '',
  email: ''
}

const Login = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
    api.authApi.loginStaffApi(data)
      .then((rs) => {
        const data = { ...rs.objectResponse, accessToken: rs.data.accessToken, refreshToken: rs.data.refreshToken }
        dispatch(handleLogin(data))
        navigate(getHomeRouteForLoggedInUser(rs.objectResponse.role))
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
    <div className='auth-wrapper auth-cover' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Row className='auth-inner m-0'>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Đăng nhập cho quản lý
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
                      type='email'
                      placeholder='john@example.com'
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
              <Button type='submit' color='primary' block>
                Đăng nhập
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login