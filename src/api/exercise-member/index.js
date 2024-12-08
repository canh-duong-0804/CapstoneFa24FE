import requester from '../request'
import { AUTH } from '../constants'
//import { IPagingParams, I } from '@src/domain/models/I'

const exerciseMemberApi = {
  getAllExerciseByCategoryApi: (category) => requester.get(`${AUTH.EXERCISE_MEMBER_API.GET_ALL_EXERCISE_FOR_MEMBER_API}?isCardioFilter=${category}`, {}),
  getExerciseCardioApi: (id) => requester.get(`${AUTH.EXERCISE_MEMBER_API.GET_EXERCISE_CARDIO_DETAIL_API}/${id}`),
  getExerciseResistanceApi: (id) => requester.get(`${AUTH.EXERCISE_MEMBER_API.GET_EXERCISE_RESISTANCE_DETAIL_API}/${id}`),
  getExerciseOtherApi: (id) => requester.get(`${AUTH.EXERCISE_MEMBER_API.GET_EXERCISE_OTHER_API}/${id}`)
}

export default { exerciseMemberApi }