import authApi from './auth'
import staffApi from './staff'

const api = {
    ...authApi,
    ...staffApi
}

export default api