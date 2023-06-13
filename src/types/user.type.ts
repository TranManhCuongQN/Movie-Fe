export interface User {
  username: string
  displayName?: string
  password: string
  salt?: string
  confirmPassword?: string
  newPassword?: string
  confirmNewPassword?: string
  token?: string
}
