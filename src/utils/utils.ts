export const setAccessTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', token)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('token')
}

export const removeLocalStorage = () => {
  localStorage.removeItem('token')
}
