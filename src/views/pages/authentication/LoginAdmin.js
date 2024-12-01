// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { handleLogin } from '@store/authentication'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, Form, Input, Label, Button, CardText, CardTitle, Card, CardBody } from 'reactstrap'
import api from '../../../api/index'
import { getHomeRouteForLoggedInUser } from '@utils'
import themeConfig from '@configs/themeConfig'
// ** Context
import { AbilityContext } from '@src/utility/context/Can'
// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { useContext } from 'react'

const defaultValues = {
  password: '',
  email: ''
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

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      api.authApi.loginStaffApi(data)
        .then((rs) => {
          console.log('rs', rs)
          if (rs.success === true) {
            const data = { ...rs.staff, accessToken: rs.data.accessToken, refreshToken: rs.data.refreshToken, ability: [{ action: 'read', subject: 'All' }] }
            dispatch(handleLogin(data))
            ability.update([{ action: 'read', subject: 'All' }])
            navigate(getHomeRouteForLoggedInUser(data.role))
          } else {
            notificationError('Đăng nhập tài khoản thất bại')
          }

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
    <div className='auth-wrapper auth-basic px-2'>
    <div className='auth-inner my-2'>
      <Card className='mb-0'>
        <CardBody>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img className='mb-25' height={35} src={themeConfig.app.appLogoImageNoText} alt='logo' />
            <h2 className='brand-text text-primary ms-1'>Health Tracking</h2>
          </Link>
          <CardTitle tag='h4' className='mb-1'>
            Đăng nhập cho quản lý
          </CardTitle>
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
        </CardBody>
      </Card>
    </div>
  </div>
  )
}

export default Login