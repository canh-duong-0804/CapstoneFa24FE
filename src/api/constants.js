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
    CREATE_EXERCISE_API: `${BASE_URL}/api/Exercise/Create-exercise`,
    GET_ALL_EXERCISE_API: `${BASE_URL}/api/Exercise/Get-all-exercises`,
    GET_EXERCISE_BY_ID_API: `${BASE_URL}/api/Exercise/Get-exercise-by-id`,
    UPDATE_EXERCISE_API: `${BASE_URL}/api/Exercise/Update-exercise`,
    DELETE_EXERCISE_BY_ID_API: `${BASE_URL}/api/Exercise/Delete-exercise`
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
    GET_LIST_BOX_FOOD_API: `${BASE_URL}/api/Food/get-list-box-for-staff`,
    GET_LIST_BOX_DIET_API: `${BASE_URL}/api/Diet/Get-all-diet`
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
  }

}