import authApi from './auth'
import staffApi from './staff'
import exerciseApi from './excercise'
import categoryExerciseApi from './exercise-category'
import foodApi from './food'
import ingredientApi from './ingredient'
import recipeApi from './recipe'


const api = {
    ...authApi,
    ...staffApi,
    ...exerciseApi,
    ...categoryExerciseApi,
    ...foodApi,
    ...ingredientApi,
    ...recipeApi
}

export default api