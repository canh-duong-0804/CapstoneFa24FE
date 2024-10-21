import requester from '../requester'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

const { URL_API } = AUTH

const config = {
  withCredentials: true
}

const authApi = {
  loginApi: () => requester.get(URL_API.LOGIN_API)
  //registerApi: (params) => requester.post(URL_API.REGISTER_API, params, {}),
  //forgotPasswordApi: (params) => requester.post(URL_API.FORGOT_PASSWORD_API, params, {}),
  //resetPasswordApi: (token, params) => requester.post(`${URL_API.RESET_PASSWORD_API}?token=${token}`, params, {})
}

export default { authApi }