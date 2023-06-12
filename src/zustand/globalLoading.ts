import { create } from 'zustand'

interface GlobalLoading {
  globalLoading: boolean
  setGlobalLoading: (globalLoading: boolean) => void
}

const useGlobalLoadingStore = create<GlobalLoading>()((set) => ({
  globalLoading: false,
  setGlobalLoading: (globalLoading: boolean) => set({ globalLoading })
}))

export default useGlobalLoadingStore
