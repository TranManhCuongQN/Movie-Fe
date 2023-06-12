import { create } from 'zustand'

interface AppState {
  appState: string
  setAppState: (appState: string) => void
}

const useAppStateStore = create<AppState>()((set) => ({
  appState: '',
  setAppState: (appState: string) => set({ appState })
}))

export default useAppStateStore
