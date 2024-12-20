import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const foodDairyApi = {
  createFoodDairyApi: (params) => requester.post(AUTH.FOOD_DAIRY_API.CREATE_FOOD_DAIRY_API, params),
  getAllFoodDairyApi: (date) => requester.get(`${AUTH.FOOD_DAIRY_API.GET_ALL_FOOD_DAIRY_API}?date=${date}`),
  getFoodDairyDetailApi: (date, mealType) => requester.get(`${AUTH.FOOD_DAIRY_API.GET_FOOD_DAIRY_DETAIL_API}?selectDate=${date}&mealType=${mealType}`),
  getAllFoodDairyDetailByDateApi: (date) => requester.get(`${AUTH.FOOD_DAIRY_API.GET_FOOD_DAIRY_DETAIL_BY_DATE_API}?date=${date}`),
  updateFoodDairyApi: (params) => requester.put(AUTH.INGERDIENT_API.UPDATE_INGERDIENT_API, params),
  deleteFoodDairyByIdApi: (date, mealType) => requester.delete(`${AUTH.FOOD_DAIRY_API.DELETE_FOOD_DAIRY_BY_ID_API}?selectDate=${date}&mealtype=${mealType}`)
}

export default { foodDairyApi }