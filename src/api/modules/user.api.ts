import { User } from 'src/types/user.type'
import axiosClient from '../axios.client'

const userEndpoints = {
  signin: 'user/signin',
  signup: 'user/signup',
  getInfo: 'user/info',
  passwordUpdate: 'user/update-password'
}

const userApi = {
  signin: async ({ username, password }: User) => {
    const response = await axiosClient.post(userEndpoints.signin, {
      username,
      password
    })
  },
  signup: async ({ username, password, confirmPassword, displayName }: User) => {
    const response = await axiosClient.post(userEndpoints.signup, {
      username,
      password,
      confirmPassword,
      displayName
    })
  },
  getInfo: async () => {
    const response = await axiosClient.get(userEndpoints.getInfo)
    return response.data
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }: User) => {
    const response = await axiosClient.put(userEndpoints.passwordUpdate, {
      password,
      newPassword,
      confirmNewPassword
    })
  }
}

export default userApi
