import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const exerciseDairyApi = {
  createExerciseDairyApi: (params) => requester.post(AUTH.EXERCISE_DAIRY_API.CREATE_EXERCISE_DAIRY_API, params),
  getAllExerciseDairyApi: (date) => requester.get(`${AUTH.EXERCISE_DAIRY_API.GET_ALL_EXERCISE_DAIRY_API}?date=${date}`),
  getExerciseDairyDetailApi: (date) => requester.get(`${AUTH.EXERCISE_DAIRY_API.GET_EXERCISE_DAIRY_DETAIL_API}?selectDate=${date}`)
}

export default { exerciseDairyApi }