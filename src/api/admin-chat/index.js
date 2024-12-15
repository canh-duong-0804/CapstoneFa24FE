import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const adminChatApi = {
  asignStaffApi: (params) => requester.post(AUTH.ADMIN_CHAT_API.ASIGN_STAFF_API, params),
  getAllChatForTrainerApi: (page) => requester.get(`${AUTH.ADMIN_CHAT_API.GET_ALL_CHAT_FOR_TRAINER_API}?pageNumber=${page}`, {}),
  getAllTrainerApi: () => requester.get(AUTH.ADMIN_CHAT_API.GET_ALL_TRAINER_API),
  getAllRequestTrainerApi: () => requester.get(AUTH.ADMIN_CHAT_API.GET_ALL_REQUEST_OF_TRAINER_API),
  getAllChatMessageApi: (id) => requester.get(`${AUTH.ADMIN_CHAT_API.GET_CHAT_MESSAGE_API}?ChatId=${id}`),
  sendMessageApi: (params) => requester.post(AUTH.ADMIN_CHAT_API.SEND_MESSAGE_API, params)
  
}

export default { adminChatApi }