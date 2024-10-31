import { PUBLIC_URL_SERVER_API } from "../dataConfig"

export const BASE_URL = PUBLIC_URL_SERVER_API

export const AUTH = {
    AUTH_API: {
      LOGIN_API: `${BASE_URL}/api/Users/login`,
      LOGIN_STAFF_API: `${BASE_URL}/api/Staff/login`, 
      REGISTER_API: `${BASE_URL}/api/Users/register-mobile`
    },
    STAFF_API: {
      CREATE_ACCOUNT_API: `${BASE_URL}/api/Staff/create-account-staff`,
      GET_ALL_ACCOUNT_API: `${BASE_URL}/api/Staff/get-all-account-staff`, 
      GET_ACCOUNT_BY_ID_API: `${BASE_URL}/api/Staff/get-account-staff-by-id`,
      UPDATE_ROLE_API: `${BASE_URL}/api/Staff/update-role-account`,
      DELETE_ACCOUNT_BY_ID_API: `${BASE_URL}/api/Staff/delete-account-staff`
    }
  }