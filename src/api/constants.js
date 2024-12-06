import { PUBLIC_URL_SERVER_API } from "../dataConfig"

export const BASE_URL = PUBLIC_URL_SERVER_API

export const AUTH = {
  AUTH_API: {
    LOGIN_API: `${BASE_URL}/api/Users/login`,
    LOGIN_STAFF_API: `${BASE_URL}/api/Staff/login`,
    REGISTER_API: `${BASE_URL}/api/Users/register-mobile`
  },
  STAFF_API: {
    CREATE_ACCOUNT_API: `${BASE_URL}/api/Staff/create-account-staff-by-admin`,
    GET_ALL_ACCOUNT_API: `${BASE_URL}/api/Staff/get-all-account-staff-for-admin`,
    GET_ACCOUNT_BY_ID_API: `${BASE_URL}/api/Staff/get-account-staff-for-admin-by-id`,
    UPDATE_ROLE_API: `${BASE_URL}/api/Staff/update-role-account-by-admin`,
    DELETE_ACCOUNT_BY_ID_API: `${BASE_URL}/api/Staff/delete-account-staff-by-admin`,
    GET_ACCOUNT_FOR_STAFF_BY_ID_API: `${BASE_URL}/api/Staff/get-account-staff-for-staff-by-id`,
    UPDATE_PERSONAL_ACCOUNT_API: `${BASE_URL}/api/Staff/update-personal-account-staff-by-staff`
  },
  EXERCISE_API: {
    CREATE_EXERCISE_API: `${BASE_URL}/api/ExerciseTrainer/create-exercise`,
    UPLOAD_IMAGE_EXERCISE_API: `${BASE_URL}/api/ExerciseTrainer/upload-image-exercise`,
    GET_ALL_EXERCISE_API: `${BASE_URL}/api/ExerciseTrainer/get-all-exercises-trainer`,
    GET_LIST_BOX_EXERCISE_API: `${BASE_URL}/api/ExecriseDiaryDetail/get-list-box-exercise`,
    GET_EXERCISE_BY_ID_API: `${BASE_URL}/api/ExerciseTrainer/get-exercise-detail`,
    UPDATE_EXERCISE_API: `${BASE_URL}/api/ExerciseTrainer/update-exercise`,
    DELETE_EXERCISE_BY_ID_API: `${BASE_URL}/api/ExerciseTrainer/delete-exercise`,
    UPLOAD_EXERCISE_IMAGE_API: `${BASE_URL}/api/ExerciseTrainer/upload-image-exercise`

  },
  EXERCISE_CATEGORY_API: {
    CREATE_EXERCISE_CATEGORY_API: `${BASE_URL}/api/CategoryExercise/Create-category-exercise`,
    GET_ALL_EXERCISE_CATEGORY_API: `${BASE_URL}/api/CategoryExercise/Get-all-category-exercise`,
    GET_EXERCISE_CATEGORY_BY_ID_API: `${BASE_URL}/api/CategoryExercise/Get-exercise-by-id`,
    UPDATE_EXERCISE_CATEGORY_API: `${BASE_URL}/api/CategoryExercise/Update-category-exercise`,
    DELETE_EXERCISE_CATEGORY_BY_ID_API: `${BASE_URL}/api/CategoryExercise/Delete-category-exercise-by-id`,
    GET_LIST_BOX_CATEGORY_API: `${BASE_URL}/api/CategoryExercise/Get-list-box`
  },
  FOOD_API: {
    CREATE_FOOD_API: `${BASE_URL}/api/Food/create-food`,
    GET_ALL_FOOD_FOR_STAFF_API: `${BASE_URL}/api/Food/get-all-foods-for-staff`,
    GET_ALL_FOOD_FOR_MEMBER_API: `${BASE_URL}/api/Food/get-all-foods-for-member`,
    GET_FOOD_FOR_STAFF_BY_ID_API: `${BASE_URL}/api/Food/get-food-for-staff-by-id`,
    GET_FOOD_FOR_MEMBER_BY__ID_API: `${BASE_URL}/api/Food/get-food-for-member-by-id`,
    UPDATE_FOOD_API: `${BASE_URL}/api/Food/update-food`,
    DELETE_FOOD_BY_ID_API: `${BASE_URL}/api/Food/delete-food`,
    GET_LIST_BOX_FOOD_API: `${BASE_URL}/api/Food/get-list-box-food-for-staff`,
    GET_LIST_BOX_DIET_API: `${BASE_URL}/api/Diet/Get-all-diet`,
    GET_LIST_BOX_INGREDIENT_API: `${BASE_URL}/api/Ingredient/get-list-box-ingredient-for-staff`
  },
  RECIPE_API: {
    CREATE_RECIPE_API: `${BASE_URL}/api/Recipe/create-recipe`,
    GET_ALL_RECIPE_FOR_MEMBER_API: `${BASE_URL}/api/Recipe/get-all-recipes-for-member`,
    GET_ALL_RECIPE_FOR_STAFF_API: `${BASE_URL}/api/Recipe/get-all-recipe-for-staff`,
    GET_RECIPE_BY_ID_API: `${BASE_URL}/api/Recipe/get-recipe-for-staff-by-id`,
    UPDATE_RECIPE_API: `${BASE_URL}/api/Recipe/update-Recipe`,
    DELETE_RECIPE_BY_ID_API: `${BASE_URL}/api/Recipe/Delete-Recipe`
  },
  INGERDIENT_API: {
    CREATE_INGERDIENT_API: `${BASE_URL}/api/Ingredient/create-ingredient`,
    GET_ALL_INGERDIENT_API: `${BASE_URL}/api/Ingredient/get-all-ingredient`,
    GET_INGERDIENT_BY_ID_API: `${BASE_URL}/api/Ingredient/Get-Ingredient-by-id`,
    UPDATE_INGERDIENT_API: `${BASE_URL}/api/Ingredient/update-ingredient-status`,
    DELETE_INGERDIENT_BY_ID_API: `${BASE_URL}/api/Ingredient/Delete-Ingredient`,
    GET_LIST_BOX_INGERDIENT_API: `${BASE_URL}/api/Ingredient/get-list-box-ingredient-for-staff`
  },
  MEAL_PLAN_TRAINER_API: {
    CREATE_MEAL_PLAN_TRAINER_API: `${BASE_URL}/api/MealPlanTrainner/create-meal-plan-by-trainner`,
    CREATE_MEAL_PLAN_DETAIL_TRAINER_API: `${BASE_URL}/api/MealPlanTrainner/create-meal-plan-detail`,
    GET_ALL_MEAL_PLAN_TRAINER_API: `${BASE_URL}/api/MealPlanTrainner/Get-all-meal-plan-for-staff`,
    GET_MEAL_PLAN_DETAIL_API: `${BASE_URL}/api/MealPlanTrainner/get-meal-plan-detail`,
    GET_MEAL_PLAN_TRAINER_BY_ID_API: `${BASE_URL}/api/MealPlanTrainner/Get-MealPlanTrainner-by-id`,
    UPDATE_MEAL_PLAN_TRAINER_API: `${BASE_URL}/api/MealPlanTrainner/update-MealPlanTrainner-status`,
    DELETE_MEAL_PLAN_TRAINER_BY_ID_API: `${BASE_URL}/api/MealPlanTrainner/delete-meal-plan-by-trainner`,
    GET_LIST_BOX_INGERDIENT_API: `${BASE_URL}/api/MealPlanTrainner/get-list-box-MealPlanTrainner-for-staff`
  },
  DASHBOARD_MOBLIE_API: {
    GET_DASHBOARD_MOBLIE_API: `${BASE_URL}/api/MainDashBoardMobile/Get-main-dashboard-for-member-by-id`
  },
  FOOD_DAIRY_API: {
    CREATE_FOOD_DAIRY_API: `${BASE_URL}/api/FoodDiary/addFoodListToDiaryForWebsite`,
    GET_ALL_FOOD_DAIRY_API: `${BASE_URL}/api/FoodDiary/get-all-diaries-for-month-with-meal-types`,
    GET_FOOD_DAIRY_DETAIL_API: `${BASE_URL}/api/FoodDiary/Get-Food-dairy-detail-website`,
    GET_FOOD_DAIRY_DETAIL_BY_DATE_API: `${BASE_URL}/api/FoodDiary/Get-Food-dairy-detail`,
    UPDATE_FOOD_DAIRY_API: `${BASE_URL}/api/Ingredient/update-ingredient-status`,
    DELETE_FOOD_DAIRY_BY_ID_API: `${BASE_URL}/api/Ingredient/Delete-Ingredient`,
    GET_LIST_BOX_FOOD_DAIRY_API: `${BASE_URL}/api/Ingredient/get-list-box-ingredient-for-staff`
  },
  EXERCISE_DAIRY_API: {
    CREATE_EXERCISE_DAIRY_API: `${BASE_URL}/api/ExecriseDiaryDetail/addExerciseListToDiaryForWebsite`,
    GET_ALL_EXERCISE_DAIRY_API: `${BASE_URL}api/ExecriseDiaryDetail/get-all-diaries-for-month-of-exercise`
  },
  MEAL_PLAN_EXERCISE_TRAINER_API: {
    CREATE_PLAN_EXERCISE_TRAINER_API: `${BASE_URL}/api/ExecrisePlanTrainer/create-exercise-plan`,
    CREATE_PLAN_EXERCISE_DETAIL_TRAINER_API: `${BASE_URL}/api/ExecrisePlanTrainer/create-exercise-plan-detail`,
    GET_ALL_PLAN_EXERCISE_TRAINER_API: `${BASE_URL}/api/ExecrisePlanTrainer/get-all-exercise-plans`,
    GET_PLAN_EXERCISE_DETAIL_API: `${BASE_URL}/api/ExecrisePlanTrainer/get-exercise-plan-detail`,
    GET_PLAN_EXERCISE_TRAINER_BY_ID_API: `${BASE_URL}/api/MealPlanTrainner/Get-MealPlanTrainner-by-id`,
    UPDATE_PLAN_EXERCISE_TRAINER_API: `${BASE_URL}/api/ExecrisePlanTrainer/update-exercise-plan-detail`,
    DELETE_PLAN_EXERCISE_TRAINER_BY_ID_API: `${BASE_URL}/api/MealPlanTrainner/delete-meal-plan-by-trainner`
  },
  DASHBOARD_ADMIN_API: {
    GET_MAIN_DASHBOARD_ADMIN_API: `${BASE_URL}/api/MainDashboardForAdminManage/Get-main-dashboard-for-Admin`,
    GET_MAIN_DASHBOARD_Trainer_API: `${BASE_URL}/api/MainDashboardForTrainerManage/Get-main-dashboard-for-Main-Trainer`
    
  }

}