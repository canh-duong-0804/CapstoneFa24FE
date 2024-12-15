import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const adminChatApi = {
  asignStaffApi: (params) => requester.post(AUTH.ADMIN_CHAT_API.ASIGN_STAFF_API, params),
  getAllChatForTrainerApi: (page) => requester.get(`${AUTH.ADMIN_CHAT_API.GET_ALL_CHAT_FOR_TRAINER_API}?pageNumber=${page}`, {}),
  getAllTrainerApi: () => requester.get(AUTH.ADMIN_CHAT_API.GET_ALL_TRAINER_API)
  
}

export default { adminChatApi }