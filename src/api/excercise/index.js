import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

// const config = {
//   withCredentials: true
// }

const exerciseApi = {
  createExerciseApi: (params) => requester.post(AUTH.EXERCISE_API.CREATE_EXERCISE_API, params),
  getAllExerciseApi: (page) => requester.get(`${AUTH.EXERCISE_API.GET_ALL_EXERCISE_API}?page=${page}`, {}),
  getExerciseByIdApi: (id) => requester.get(`${AUTH.EXERCISE_API.GET_EXERCISE_BY_ID_API}/${id}`),
  updateExerciseApi: (params) => requester.put(AUTH.EXERCISE_API.UPDATE_EXERCISE_API, params),
  deleteExerciseByIdApi: (id) => requester.delete(`${AUTH.EXERCISE_API.DELETE_EXERCISE_BY_ID_API}/${id}`),
  updateExerciseImageApi: (imageFile, exerciseId) => {
    const formData = new FormData()
    formData.append('imageFile', imageFile) // Thêm tệp hình ảnh vào FormData
    formData.append('exerciseId', exerciseId)  // Thêm exerciseId vào FormData

    return requester.put(AUTH.EXERCISE_API.UPLOAD_EXERCISE_IMAGE_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Thiết lập header cho multipart/form-data
      }
    })
  }
}


export default { exerciseApi }