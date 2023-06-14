import { Favorite } from 'src/types/favorites.type'
import { User } from 'src/types/user.type'
import { create } from 'zustand'

interface Auth {
  user: User | null
  listFavorites: Favorite[]
  setUser: (user: User | null) => void
  setListFavorites: (listFavorites: Favorite[]) => void
  addFavorite: (favorite: Favorite) => void
  removeFavorite: (favorite: Favorite) => void
}

const useAuthStore = create<Auth>()((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  listFavorites: [],
  setUser: (user: User | null) => {
    if (!user) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('token', user.token as string)
      localStorage.setItem('user', JSON.stringify(user))
    }
    set({ user })
  },
  setListFavorites: (listFavorites: Favorite[]) => set({ listFavorites }),
  addFavorite: (favorite: Favorite) => set((state) => ({ listFavorites: [...state.listFavorites, favorite] })),
  removeFavorite: (favorite: Favorite) =>
    set((state) => ({ listFavorites: state.listFavorites.filter((fav) => fav.mediaId !== favorite.mediaId) }))
}))

export default useAuthStore
