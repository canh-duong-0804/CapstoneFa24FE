import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const categoryExerciseApi = {
  createCategoryExerciseApi: (params) => requester.post(AUTH.EXERCISE_CATEGORY_API.CREATE_EXERCISE_CATEGORY_API, params),
  getAllCategoryExerciseApi: () => requester.get(AUTH.EXERCISE_CATEGORY_API.GET_ALL_EXERCISE_CATEGORY_API),
  getListBoxCategoryExerciseApi: () => requester.get(AUTH.EXERCISE_CATEGORY_API.GET_LIST_BOX_CATEGORY_API),
  getCategoryExerciseByIdApi: (id) => requester.get(`${AUTH.EXERCISE_CATEGORY_API.GET_EXERCISE_CATEGORY_BY_ID_API}/${id}`),
  updateCategoryExerciseApi: (params) => requester.put(AUTH.EXERCISE_CATEGORY_API.UPDATE_EXERCISE_CATEGORY_API, params),
  deleteCategoryExerciseByIdApi: (id) => requester.delete(`${AUTH.EXERCISE_CATEGORY_API.DELETE_EXERCISE_CATEGORY_BY_ID_API}/${id}`)
}

export default { categoryExerciseApi }