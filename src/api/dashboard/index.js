import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const dashboardApi = {
  getMainDashboardAdminApi: (date) => requester.get(`${AUTH.DASHBOARD_ADMIN_API.GET_MAIN_DASHBOARD_ADMIN_API}?SelectDate=${date}`),
  getListBoxIngredientApi: () => requester.get(AUTH.INGERDIENT_API.GET_LIST_BOX_INGERDIENT_API),
  getIngredientByIdApi: (id) => requester.get(`${AUTH.INGERDIENT_API.GET_INGERDIENT_BY_ID_API}/${id}`),
  updateIngredientApi: (params) => requester.put(AUTH.INGERDIENT_API.UPDATE_INGERDIENT_API, params),
  deleteIngredientByIdApi: (id) => requester.delete(`${AUTH.INGERDIENT_API.DELETE_INGERDIENT_BY_ID_API}/${id}`)
}

export default { dashboardApi }