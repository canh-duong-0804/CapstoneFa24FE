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
import exerciseDairyApi from './exercise-diary'
import exerciseMemberApi from './exercise-member'
import adminChatApi from './admin-chat'


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
    ...dashboardApi,
    ...exerciseDairyApi,
    ...exerciseMemberApi,
    ...adminChatApi
}

export default api