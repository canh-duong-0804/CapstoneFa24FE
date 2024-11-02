import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const foodApi = {
  createFoodApi: (params) => requester.post(AUTH.FOOD_API.CREATE_FOOD_API, params),
  getAllFoodForStaffApi: () => requester.get(AUTH.FOOD_API.GET_ALL_FOOD_FOR_STAFF_API),
  getAllFoodForMemberApi: () => requester.get(AUTH.FOOD_API.GET_ALL_FOOD_FOR_MEMBER_API),
  getListBoxFoodApi: () => requester.get(AUTH.FOOD_API.GET_LIST_BOX_FOOD_API),
  getFoodForStaffByIdApi: (id) => requester.get(`${AUTH.FOOD_API.GET_FOOD_FOR_STAFF_BY_ID_API}/${id}`),
  getFoodForMemberByIdApi: (id) => requester.get(`${AUTH.FOOD_API.GET_FOOD_FOR_MEMBER_BY__ID_API}/${id}`),
  updateFoodApi: (params) => requester.put(AUTH.FOOD_API.UPDATE_FOOD_API, params),
  deleteFoodByIdApi: (id) => requester.delete(`${AUTH.FOOD_API.DELETE_FOOD_BY_ID_API}/${id}`),
  getListboxDietApi: () => requester.get(AUTH.FOOD_API.GET_LIST_BOX_DIET_API)
}

export default { foodApi }