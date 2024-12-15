import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const staffApi = {
  createAccountApi: (params) => requester.post(AUTH.STAFF_API.CREATE_ACCOUNT_API, params),
  getAllAccountApi: (page, search) => requester.get(`${AUTH.STAFF_API.GET_ALL_ACCOUNT_API}?page=${page}&searchStaff=${search}`),
  getAccountByIdApi: (id) => requester.get(`${AUTH.STAFF_API.GET_ACCOUNT_BY_ID_API}/${id}`),
  updateRoleApi: (params) => requester.put(AUTH.STAFF_API.UPDATE_ROLE_API, params),
  deleteAccountByIdApi: (id) => requester.delete(`${AUTH.STAFF_API.DELETE_ACCOUNT_BY_ID_API}/${id}`)
}

export default { staffApi }