import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const recipeApi = {
  createRecipeApi: (params) => requester.post(AUTH.RECIPE_API.CREATE_RECIPE_API, params),
  getAllRecipeForMemberApi: () => requester.get(AUTH.RECIPE_API.GET_ALL_RECIPE_FOR_MEMBER_API),
  getAllRecipeForStaffApi: () => requester.get(AUTH.RECIPE_API.GET_ALL_RECIPE_FOR_STAFF_API),
  getRecipeByIdApi: (id) => requester.get(`${AUTH.RECIPE_API.GET_RECIPE_BY_ID_API}/${id}`),
  updateRecipeApi: (params) => requester.put(AUTH.RECIPE_API.UPDATE_RECIPE_API, params),
  deleteRecipeByIdApi: (id) => requester.delete(`${AUTH.RECIPE_API.DELETE_RECIPE_BY_ID_API}/${id}`)
}

export default { recipeApi }