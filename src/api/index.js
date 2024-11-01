import authApi from './auth'
import staffApi from './staff'
import exerciseApi from './excercise'
import categoryExerciseApi from './exercise-category'

const api = {
    ...authApi,
    ...staffApi,
    ...exerciseApi,
    ...categoryExerciseApi
}

export default api