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
    return response
  },
  signup: async ({ username, password, displayName }: User) => {
    const response = await axiosClient.post(userEndpoints.signup, {
      username,
      password,
      displayName
    })
    return response
  },
  getInfo: async () => {
    const response = await axiosClient.get(userEndpoints.getInfo)
    return response
  },
  passwordUpdate: async ({
    password,
    newPassword,
    confirmNewPassword
  }: {
    password: string
    newPassword: string
    confirmNewPassword: string
  }) => {
    const response = await axiosClient.put(userEndpoints.passwordUpdate, {
      password,
      newPassword,
      confirmNewPassword
    })
    return response
  }
}

export default userApi
