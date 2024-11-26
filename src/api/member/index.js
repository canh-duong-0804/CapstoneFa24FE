import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const mainDashboardApi = {
  getMainDashboardApi: (date) => requester.get(`${AUTH.DASHBOARD_MOBLIE_API.GET_DASHBOARD_MOBLIE_API}?date=${date}`)
 
}

export default { mainDashboardApi }