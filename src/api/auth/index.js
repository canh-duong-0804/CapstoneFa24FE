import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const authApi = {
  loginApi: (params) => requester.post(AUTH.AUTH_API.LOGIN_API, params),
  loginStaffApi: (params) => requester.post(AUTH.AUTH_API.LOGIN_STAFF_API, params),
  registerApi: (params) => requester.post(AUTH.AUTH_API.REGISTER_API, params, {})
  //forgotPasswordApi: (params) => requester.post(URL_API.FORGOT_PASSWORD_API, params, {}),
  //resetPasswordApi: (token, params) => requester.post(`${URL_API.RESET_PASSWORD_API}?token=${token}`, params, {})
}

export default { authApi }