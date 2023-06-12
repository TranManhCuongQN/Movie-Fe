import { Favorite } from 'src/types/favorites.type'
import { User } from 'src/types/user.type'
import { create } from 'zustand'

interface Auth {
  user: User | null
  listFavorites: Favorite[]
  setUser: (user: User | null) => void
}

const useAuthStore = create<Auth>()((set) => ({
  user: null,
  listFavorites: [],
  setUser: (user: User | null) => set({ user })
}))

export default useAuthStore
