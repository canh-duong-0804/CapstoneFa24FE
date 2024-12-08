import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

const exercisePlanTrainerApi = {
  createExercisePlanTrainerApi: (params) => requester.post(AUTH.MEAL_PLAN_EXERCISE_TRAINER_API.CREATE_PLAN_EXERCISE_TRAINER_API, params),
  createExercisePlanDetailApi: (params) => requester.post(AUTH.MEAL_PLAN_EXERCISE_TRAINER_API.CREATE_PLAN_EXERCISE_DETAIL_TRAINER_API, params),
  getAllExercisePlanTrainerApi: (page) => requester.get(`${AUTH.MEAL_PLAN_EXERCISE_TRAINER_API.GET_ALL_PLAN_EXERCISE_TRAINER_API}?page=${page}`, {}),
  getExercisePlanDetailApi: (id, day) => requester.get(`${AUTH.MEAL_PLAN_EXERCISE_TRAINER_API.GET_PLAN_EXERCISE_DETAIL_API}?exercisePlanId=${id}&day=${day}`, {}),
  getExercisePlanTrainerByIdApi: (id) => requester.get(`${AUTH.MEAL_PLAN_EXERCISE_TRAINER_API.GET_MealPlanTrainer_BY_ID_API}/${id}`),
  updateExercisePlanTrainerApi: (params) => requester.put(AUTH.MEAL_PLAN_EXERCISE_TRAINER_API.UPDATE_MEAL_PLAN_TRAINER_API, params),
  deleteExercisePlanTrainerByIdApi: (id) => requester.delete(`${AUTH.MEAL_PLAN_EXERCISE_TRAINER_API.DELETE_PLAN_EXERCISE_TRAINER_BY_ID_API}/${id}`)
}

export default { exercisePlanTrainerApi }