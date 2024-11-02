import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const ingredientApi = {
  createIngredientApi: (params) => requester.post(AUTH.INGERDIENT_API.CREATE_INGERDIENT_API, params),
  getAllIngredientApi: () => requester.get(AUTH.INGERDIENT_API.GET_ALL_INGERDIENT_API),
  getListBoxIngredientApi: () => requester.get(AUTH.INGERDIENT_API.GET_LIST_BOX_INGERDIENT_API),
  getIngredientByIdApi: (id) => requester.get(`${AUTH.INGERDIENT_API.GET_INGERDIENT_BY_ID_API}/${id}`),
  updateIngredientApi: (params) => requester.put(AUTH.INGERDIENT_API.UPDATE_INGERDIENT_API, params),
  deleteIngredientByIdApi: (id) => requester.delete(`${AUTH.INGERDIENT_API.DELETE_INGERDIENT_BY_ID_API}/${id}`)
}

export default { ingredientApi }