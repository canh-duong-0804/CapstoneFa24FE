import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const dashboardApi = {
  getMainDashboardAdminApi: (date) => requester.get(`${AUTH.DASHBOARD_ADMIN_API.GET_MAIN_DASHBOARD_ADMIN_API}?SelectDate=${date}`),
  getMainDashboardTrainerApi: (date) => requester.get(`${AUTH.DASHBOARD_ADMIN_API.GET_MAIN_DASHBOARD_Trainer_API}?SelectDate=${date}`)
  
}

export default { dashboardApi }