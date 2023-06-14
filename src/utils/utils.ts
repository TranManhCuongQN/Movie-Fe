import { Favorite } from 'src/types/favorites.type'

export const setAccessTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', token)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('token')
}

export const removeLocalStorage = () => {
  localStorage.removeItem('token')
}

export const favoriteUtils = {
  check: ({ listFavorites, mediaId }: { listFavorites: Favorite[]; mediaId: string }) =>
    listFavorites && listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !== undefined
}
