import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const exerciseApi = {
  createExerciseApi: (params) => requester.post(AUTH.EXERCISE_API.CREATE_EXERCISE_API, params),
  getAllExerciseApi: () => requester.get(AUTH.EXERCISE_API.GET_ALL_EXERCISE_API),
  getExerciseByIdApi: (id) => requester.get(`${AUTH.EXERCISE_API.GET_EXERCISE_BY_ID_API}/${id}`),
  updateExerciseApi: (params) => requester.put(AUTH.EXERCISE_API.UPDATE_EXERCISE_API, params),
  deleteExerciseByIdApi: (id) => requester.delete(`${AUTH.EXERCISE_API.DELETE_EXERCISE_BY_ID_API}/${id}`)
}

export default { exerciseApi }