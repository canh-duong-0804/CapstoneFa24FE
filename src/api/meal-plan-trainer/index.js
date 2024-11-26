import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

const mealPlanTrainerApi = {
  createMealPlanTrainerApi: (params) => requester.post(AUTH.MEAL_PLAN_TRAINER_API.CREATE_MEAL_PLAN_TRAINER_API, params),
  createMealPlanDetailApi: (params) => requester.post(AUTH.MEAL_PLAN_TRAINER_API.CREATE_MEAL_PLAN_DETAIL_TRAINER_API, params),
  getAllMealPlanTrainerApi: (page) => requester.get(`${AUTH.MEAL_PLAN_TRAINER_API.GET_ALL_MEAL_PLAN_TRAINER_API}?page=${page}`, {}),
  getMealPlanDetailApi: (id, day) => requester.get(`${AUTH.MEAL_PLAN_TRAINER_API.GET_MEAL_PLAN_DETAIL_API}?MealPlanId=${id}&Day=${day}`, {}),
  getMealPlanTrainerByIdApi: (id) => requester.get(`${AUTH.MEAL_PLAN_TRAINER_API.GET_MealPlanTrainer_BY_ID_API}/${id}`),
  updateMealPlanTrainerApi: (params) => requester.put(AUTH.MEAL_PLAN_TRAINER_API.UPDATE_MEAL_PLAN_TRAINER_API, params),
  deleteMealPlanTrainerByIdApi: (id) => requester.delete(`${AUTH.MEAL_PLAN_TRAINER_API.DELETE_MEAL_PLAN_TRAINER_BY_ID_API}?mealPlanId=${id}`)
}

export default { mealPlanTrainerApi }