import { create } from 'zustand'

interface AuthModal {
  authModalOpen: boolean
  setAuthModalOpen: (authModalOpen: boolean) => void
}

const useAuthModalStore = create<AuthModal>()((set) => ({
  authModalOpen: false,
  setAuthModalOpen: (authModalOpen: boolean) => set({ authModalOpen })
}))

export default useAuthModalStore
