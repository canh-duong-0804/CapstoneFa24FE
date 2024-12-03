import authApi from './auth'
import staffApi from './staff'
import exerciseApi from './excercise'
import categoryExerciseApi from './exercise-category'
import foodApi from './food'
import ingredientApi from './ingredient'
import recipeApi from './recipe'
import mealPlanTrainerApi from './meal-plan-trainer'
import mainDashboardApi from './member'
import foodDairyApi from './food-diary'
import exercisePlanTrainerApi from './exercise-plan'
import dashboardApi from './dashboard'


const api = {
    ...authApi,
    ...staffApi,
    ...exerciseApi,
    ...categoryExerciseApi,
    ...foodApi,
    ...ingredientApi,
    ...recipeApi,
    ...mealPlanTrainerApi,
    ...mainDashboardApi,
    ...foodDairyApi,
    ...exercisePlanTrainerApi,
    ...dashboardApi
}

export default api